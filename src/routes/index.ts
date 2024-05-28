
import { Context } from 'koa'
// import { get, post, Controller } from '../common/decorator/httpMethod'
import getSquareCacheList from '../cache/redis/test'
import { request, summary, prefix, tags, body, responses, description, query, middlewares } from 'koa-swagger-decorator'
import { test_middleware } from '../middleware/test'
import testservices from '../services/test.services'

const { addTest, updateTest, updateTestById, getTestList, getTestById, delTestById, HasManyTest1 }  = testservices

import log from '../common/utils/logger'
import { mongodb_create, testpostC, mongodb_deleteById, mongodb_deleteMany, mongodb_getuserbyid, mongodb_getuserinfo, mongodb_selectmany, mongodb_selectPageQuery, mongodb_update, testBelongs } from '../controller'
import { SuccessModel } from '../model/resModel'



// import * as map from './map'


// @Controller('/test')
@prefix('/test')
export default class Common {

    /**
     * 接口实例
     * @param ctx Context
     */
    @request('get', '/test')
    @tags(['示例'])
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
    @tags(['示例'])
    @summary('测试实例post')
    @description('api description')
    @responses({ 200: { description: 'success' }, 400: { description: 'error' } })
    @body({
        type: { type: 'number', required: true, default: 2, description: '描述' },
        name: { type: 'string', required: true, default: '2', description: '描述' },
        age: { type: 'number', required: true, default: 2, description: '描述' },
    })
    @middlewares([test_middleware])
    async testpost(ctx: Context) {
        ctx.session.u = 'ss'

        let s = await testpostC(ctx.request.body)

        log.log(`ssss:${s}`)
        ctx.body = s

    }

    @request('get', '/mongodbtest')
    @tags(['示例'])
    @summary('测试mongdb实例get')
    @description('api description')
    @responses({ 200: { description: 'success' }, 400: { description: 'error' } })
    @query({
        id: { type: 'string', required: true, default: '5f69e49a331392288886398a', description: '用户id' },
    })
    async mongodbtest(ctx: Context) {
        const { id } = ctx.query
        // const res = await mongodb_update(
        //     { _id: id },
        //     { username: '53', password: '1', garden: 0, status: 1 }
        // )

        // const res = await mongodb_deleteById(id)
        console.log(id)

        const res = await mongodb_create({ username: '53', password: '1', garden: 1, status: 1 })

        ctx.body = res
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
