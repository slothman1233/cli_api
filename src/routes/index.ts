
import { Context } from 'koa'
// import { get, post, Controller } from '../common/decorator/httpMethod'
import getSquareCacheList from '../cache/redis/test'
import { request, summary, prefix, tags, body, responses, description, query, middlewares } from 'koa-swagger-decorator'
import { test_middleware } from '../middleware/test'
import { addTest, updateTest, updateTestById, getTestList, getTestById, delTestById, HasManyTest1 } from '../services/test.services'

import log from '../common/utils/logger'
import { testBelongs } from '../controller'



// import * as map from './map'


// @Controller('/test')
@prefix('/test')
export default class Common {

    /**
     * 接口实例
     * @param ctx Context
     */
    @request('get', '/test')
    @tags(['aa'])
    @summary('测试实例get')
    @description('api description')
    @responses({ 200: { description: 'success' }, 400: { description: 'error' } })
    @query({
        type: { type: 'number', required: true, default: 2, description: 'type' },
    })
    @middlewares([test_middleware])
    //  @get('/check')
    async test(ctx: Context) {
        ctx.session.u = 'ss'
        ctx.body = {
            code: 0,
            msg: '登录有效'
        }

    }


    /**
   * 接口实例
   * @param ctx Context
   */
    @request('post', '/testpost')
    @tags(['aa'])
    @summary('测试实例post')
    @description('api description')
    @responses({ 200: { description: 'success' }, 400: { description: 'error' } })
    // @body([{
    //     type: { type: 'number', required: true, default: 2, description: 'type' },
    //     name: { type: 'string', required: true, default: '2', description: 'type' },
    //     age: { type: 'number', required: true, default: 2, description: 'type' },
    // }])
    @body({
        type: { type: 'number', required: true, default: 2, description: '描述' },
        name: { type: 'string', required: true, default: '2', description: '描述' },
        age: { type: 'number', required: true, default: 2, description: '描述' },
    })
    @middlewares([test_middleware])
    async testpost(ctx: Context) {
        ctx.session.u = 'ss'
        ctx.request.body
        ctx.body = ctx.request.body

    }

    // @request('get', '/testdb')
    // @tags(['aa'])
    // @summary('含有数据库请求的实例需要有mysql数据库')
    // @description('api description')
    // @responses({ 200: { description: 'success' }, 400: { description: 'error' } })
    // @query({
    //     type: { type: 'number', required: true, default: 2, description: 'type' },
    // })
    // @middlewares([test_middleware])
    // //  @get('/check')
    // async testDB(ctx: Context) {
    //     getSquareCacheList(1, 1)
    //     ctx.session.u = 'ss'
    //     ctx.body = {
    //         code: 0,
    //         msg: '登录有效'
    //     }

    //     const res = await testBelongs()

    //     log.log(2323, JSON.stringify(res))
    // }

}


export const ss = function () { return 1 }
