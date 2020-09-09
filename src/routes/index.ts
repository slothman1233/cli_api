
import { Context } from 'koa'
// import { get, post, Controller } from '../common/decorator/httpMethod'
import getSquareCacheList from '../cache/redis/test'
import { request, summary, prefix, tags, body, responses, description, query, middlewares } from 'koa-swagger-decorator'
import { test_middleware } from '../middleware/test'
import { addTest, updateTest, updateTestById, getTestList, getTestById, delTestById, HasManyTest1 } from '../services/test.services'
import * as Test1 from '../services/test1.services'
import log from '../common/utils/logger'



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
    @summary('测试实例')
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

    //     const res = await Test1.BelongsToTest()

    //     log.log(2323, JSON.stringify(res))
    // }

}


export const ss = function () { return 1 }
