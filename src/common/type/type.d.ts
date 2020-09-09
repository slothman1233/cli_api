/* eslint-disable no-unused-vars */
import { Context, Next } from 'koa'


// type PlainObject = { [P: string]: any }
type PlainObject = Record<string, any>
type MysqlResult = {
  affectedRows?: number
  insertId?: string
}

/**
 * 路由模型类型
 */
type RouteMeta = {
  name: string | symbol
  method: string
  path: string
}


/**
 * 中间件的模型
 */
type MiddleWare = (ctx: Context, next?: Next) => Promise<void>;

/**
 * 包裹了一层function的中间件的模型 
 */
type MiddleWares = (...arg: any[]) => MiddleWare



export {
    MysqlResult,
    PlainObject,
    RouteMeta,
    MiddleWare,
    MiddleWares
}