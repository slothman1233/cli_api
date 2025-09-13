import koa, { Context, Next } from "koa";
import json from "koa-json";
import bodyparser from "koa-bodyparser";
import logger from "koa-logger";
import session from "koa-session";
// import koaRouter from 'koa-router'
import redisStore from "koa-redis";
import config from "./common/config/env";
// import log from './common/utils/logger'
import { notTest } from "./common/utils/env";
// import addRouter from './router'
import swaggerRouter from "./swagger_router";

import log from "./middleware/log4js/log";
import compress from "koa-compress";
import cors from "koa2-cors";
import zlib from "zlib";
//sequelize 初始化 需要则恢复 需要在config里面配置
// import './db/sequelize/index'

//mongodb 初始化 需要则恢复 需要在config里面配置
// import './db/mongodb'

// import "./common/ws/test1";

// log.log(mdb.toString())

const redisConf = config.redis;
// const router = new koaRouter()
const app = new koa();

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.headers.origin); // 很奇怪的是，使用 * 会出现一些其他问题
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,token,operateName, operateUid, sign,timestamp,nonce,accessKey"
  );
  ctx.set(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH"
  );

  await next();
});

//添加gzip压缩插件
app.use(
  compress({
    // 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
    filter: (content_type: string): boolean => {
      return /text/i.test(content_type);
    },
    // 阀值，当数据超过1kb的时候，可以压缩
    threshold: 1024,
    // zlib是node的压缩模块
    gzip: {
      flush: zlib.constants.Z_SYNC_FLUSH,
    },
    deflate: {
      flush: zlib.constants.Z_SYNC_FLUSH,
    },
    br: false, // disable brotli
  })
);

if (notTest) {
  // logger 日志
  app.use(async (ctx: Context, next: Next) => {
    //响应开始时间
    const start = Date.now();
    //响应间隔时间
    let ms: number;
    try {
      //开始进入到下一个中间件
      await next();
      //记录响应日志
      ms = Date.now() - start;
      log.info(ctx, ms);
    } catch (error) {
      //记录异常日志
      ms = Date.now() - start;
      log.error({ ctx, error, resTime: ms });
    }

    log.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
}

app.use(cors());

app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());

// if (notTest) {
//     app.use(logger())
// }

//session 配置

app.keys = redisConf.keys;
app.use(
  session(
    {
      key: "koa.sid", //cookie name 默认是 `koa.sid`
      prefix: "koa:sess:", //redis key 的前缀 默认是 `koa:sess:`

      path: "/", //默认配置
      httpOnly: true, //默认配置
      maxAge: 24 * 60 * 60 * 1000, //单位毫秒

      ///redis的设置 需要则恢复  需要在config里面配置
      store: redisStore({
          port: redisConf.port,
          host: redisConf.host,
          password: redisConf.password,
      })
    },
    app
  )
);

//路由初始化
// addRouter(router)
// app.use(router.routes()).use(router.allowedMethods())

app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods());

// 404
app.use(async (ctx: Context) => {
  log.log(`404 ${ctx.message} : ${ctx.href}`);
  ctx.status = 404;
  ctx.body = "404! content not found !";
});

// 错误处理
app.on("error", (err, ctx) => {
  log.error({ ctx, error: err, resTime: 0 });
  ctx.status = 500;
  if (ctx.app.env !== "development") {
    //throw the error to frontEnd when in the develop mode
    ctx.res.end(err.stack); //finish the response
  }
});

export default app;
