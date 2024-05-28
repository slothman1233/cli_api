/**
 * @description test middleware
 * @author 文亮
 */

import { Context, Next } from "koa";

/**
 * 中间件示例
 * @param {Context} ctx ctx
 * @param {Next} next next
 */
async function test_middleware(ctx: Context, next: Next) {
  console.log(
    ctx.request.body,
    ctx.query.type && parseInt(ctx.query.type.toString()) === 1
  );
  const body: any = ctx.request.body;
  if (
    (ctx.query.type && parseInt(ctx.query.type.toString()) === 1) ||
    (body.type && parseInt(body.type) === 1)
  ) {
    ctx.body = {
      aa: 1,
    };
  } else {
    await next();
  }
}

export { test_middleware };
