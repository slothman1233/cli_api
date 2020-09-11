import 'reflect-metadata'
import fs from 'fs'
import path from 'path'
import { ROUTER_MAP } from './common/config/constant'
import { RouteMeta } from './common/type/type'
const { ROUTER_META, CONTROLLER_PATH_METADATA, MIDDLEWARE } = ROUTER_MAP
import Router from 'koa-router'
import { Context, Next } from 'koa'
import log from './middleware/log4js/log'

/**
 * 路由的初始化
 * @param {Router} router koa-router
 */
const addRouter = (router: Router) => {
    const ctrPath = path.join(__dirname, 'routes')


    const modules: ObjectConstructor[] = []
    // 扫描controller文件夹，收集所有controller
    fs.readdirSync(ctrPath).forEach(name => {
        if (/^[^.]+\.(t|j)s$/.test(name)) {
            const module = require(path.join(ctrPath, name)).default
            if (module) { modules.push(module) }
        }
    })
    // 结合meta数据添加路由 和 验证
    modules.forEach(m => {
        let ControllerPath = Reflect.getMetadata(CONTROLLER_PATH_METADATA, m) || ''
        ControllerPath = ControllerPath !== '' ? sprit(ControllerPath) : ''

        let middlewares = Reflect.getMetadata(MIDDLEWARE, m) || ''


        const RouteMap: Array<RouteMeta> = Reflect.getMetadata(ROUTER_META, m)

        RouteMap.map(item => {
            const { name, path: ActionPath, method } = item
            const ctr = new m()
            const RoutePath = ControllerPath + sprit(ActionPath)
            let methods: Array<any> = middlewares[name] || []
            console.log(methods)
            router[method](RoutePath, middlewareFn(methods), ctr[name])
        })


    })


}

/**
 * 中间件执行的插件
 * @param {Array<AsyncFunction>} methods 中间件的方法数组
 */
function middlewareFn(methods: Array<Function>) {
    let fnAry = methods
    let ctx: Context
    let next: Next


    return async function (ctxs: Context, nexts: Next) {
        ctx = ctxs
        next = nexts
        try {
            await nextFn()
        } catch (err) {
            log.error(ctx, err, 0)
            await next()
        }
    }

    //递归执行方法
    async function nextFn() {
        if (fnAry.length === 0) {
            await next()
        } else {
            const fn = fnAry.shift()
            //判断是否是方法如果不是则跳过
            if (typeof fn !== 'function') {
                nextFn()
                return
            }
            await fn(ctx, nextFn)
        }
    }


}
/**
 * 在字符串头插入  / 
 * @param {string} str 
 */
function sprit(str: string): string {
    return str[0] === '/' ? str : `/${str}`
}

export default addRouter