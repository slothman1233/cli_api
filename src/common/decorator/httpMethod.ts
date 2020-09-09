import 'reflect-metadata'
import { ROUTER_MAP } from '../config/constant'
import { RouteMeta } from '../type/type'

const { ROUTER_META, CONTROLLER_PATH_METADATA } = ROUTER_MAP

/**
 * 存储 controller 地址的装饰器
 * @param {string} path 地址
 * @return {ClassDecorator} 类的装饰器
 */
const Controller = (path: string): ClassDecorator => {
    return target => {
        Reflect.defineMetadata(CONTROLLER_PATH_METADATA, path, target)
    }
}

/**
 * 生成 http method 装饰器
 * @param {string} method 方法名 http method，如 get、post、head
 * @return {MethodDecorator}  方法的装饰器
 */
function createMethodDecorator(method: string) {
    // 装饰器接收路由 path 作为参数
    return function httpMethodDecorator(path: string): MethodDecorator {
        return (proto: Object, name: string | symbol, /* descriptor: TypedPropertyDescriptor<any>*/) => {
            const taret = proto.constructor
            let actionObj:Array<RouteMeta> = Reflect.getMetadata(ROUTER_META, taret) || []
            actionObj.push({name, path, method})
            Reflect.defineMetadata(ROUTER_META, actionObj, taret)

        }
    }
}

// 导出 http method 装饰器
const post = createMethodDecorator('post')

const get = createMethodDecorator('get')

const del = createMethodDecorator('del')

const put = createMethodDecorator('put')

const patch = createMethodDecorator('patch')

const options = createMethodDecorator('options')

const head = createMethodDecorator('head')

const all = createMethodDecorator('all')

export {
    post, get, del, put, patch, options, head, all, Controller
}