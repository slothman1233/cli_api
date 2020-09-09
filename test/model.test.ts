/* eslint-disable no-undef */
/**
 * @description test 模型的验证
 * @author 文亮
 */


// import tests from '../src/db/sequelize/mapping/test.mapping'

import { map } from '../src/db/sequelize'

// map.Test.build({name: 'bob', weight: 99})
test('发表微博模型测试', async () => {
    const m = await map.Test.build({
        name: 1,
        weight: 1
    })

    expect(m.name).toBe(1)
    expect(m.weight).toBe(1)


})