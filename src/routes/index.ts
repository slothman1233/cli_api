
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
    @request('get', '/check')
    @tags(['aa'])
    @summary('创建用户')
    @description('api description')
    @responses({ 200: { description: 'success' }, 400: { description: 'error' } })
    @query({
        type: { type: 'number', required: true, default: 2, description: 'type' },
    })
    @middlewares([test_middleware])
    //  @get('/check')
    async test(ctx: Context) {
        getSquareCacheList(1, 1)
        ctx.session.u = 'ss'
        ctx.body = {
            code: 0,
            msg: '登录有效'
        }


        //addTest, updateTest, updateTestById 


        //const res = await  Test1.addTest({ userId: 3, age: 11, garden: 2 })

        // const res = await Test1.updateTest({ age: 11, garden: 1 }, { userId: 3 })

        //const res = await Test1.updateTestById({ age: 1551, garden: 3 }, 1)

        // const res = await getTestList()

        //const res = await Test1.getTestList()

        //const res = await getTestById(1)

        //  log.log(2323, JSON.stringify(res))

        //const res = await Test1.delTestById(2)

        //const res = await HasManyTest1(1)

        // const res = await Test.findData()

        const res = await Test1.BelongsToTest()

        log.log(2323, JSON.stringify(res))
    }

}

export const ss = function () { return 1 }
