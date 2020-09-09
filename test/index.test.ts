/* eslint-disable no-undef */

/**
 * @description test 单元测试示例
 * @author 文亮
 */

import { ss } from '../src/routes/index'
import server from './server'

test('ss', async () => {
    const res = await server.get('/api/test/check?type=1')
    const s = await server.get('/api/test/check?type=2')
    //const blog = await server.post('/api/blog/create').send({ content, image }).set('cookie', Z_COOKIE)
    // console.log(res.body)
    console.log(s.body)
    const t = { aa: 1 }
    expect(res.body).toStrictEqual(t)
    expect(ss()).toBe(1)
    expect(s.body).toStrictEqual({
        code: 0,
        msg: '登录有效'
    })
})