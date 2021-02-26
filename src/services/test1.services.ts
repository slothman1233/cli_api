/**
 * @description services 跟数据库打交道
 * @author 文亮
 */

import { Test1, Test } from '../db/sequelize/map'
import log from '../middleware/log4js/log'
import { CreateOptions, UpdateOptions } from 'sequelize/types'


class test1{

    /**
 *  添加
 * @param {Object} param0 { userId, age, garden}
 */
    async  addTest({ userId, age, garden = 3 }: { userId: number, age: number, garden: number }) {
        const res = await Test1.createItem<Test1>(
            // @ts-ignore
            {
                userId,
                age,
                garden
            }
        )
        return res

    }

    /**
 * 修改字段
 * @param {Object} param0 {userId, age, garden}
 * @param {Object} options 查询条件 { userId }
 */
    async  updateTest({ age, garden }: { age: number, garden: number }, { userId }: { userId: number }) {
    // 拼接修改内容
        let updateData: any = {}
        if (age) { updateData.age = age }
        if (garden) { updateData.garden = garden }

        // 拼接查询条件
        let whereData: any = {}
        if (userId) {
            whereData.userId = userId
        }

        // 执行修改
        const res = await Test1.updateItem<Test1>(updateData, {
            where: whereData
        })

        return res // 修改的行数
    }

    /**
 * 根据id修改数据
 * @param {Object} param0 { name, weight}
 * @param {number} id id
 */
    async  updateTestById({ age, garden }: { age: number, garden: number }, id: number) {
        let updateData: any = {}
        if (age) { updateData.age = age }
        if (garden) { updateData.garden = garden }
        const res = await Test1.updateItemById<Test1>(updateData, id)
        return res
    }

    /**
 * 获取所有的字段
 * @return {Array<Object>} object
 */
    async  getTestList() {
        const res = await Test1.getList<Test1>()

        return res
    }

    /**
 * 根据id获取数据
 * @param {number} id  id
 * @return {Object}
 */
    async  getTestById(id: number) {
        const res = await Test1.getById<Test1>(id)
        return res

    }

    /**
 * 删除某条数据（软删除）
 * @param id 
 */
    async  delTestById(id: number) {
        const res = await Test1.deleteById(id)
        return res
    }

    /**
 * 连表查询 BelongsTo  1对1
 */
    async  BelongsToTest() {
        const res: any = await Test1.findOne({
            where: { 
                userId: 1
            },
            include: [
                {
                
                    // @ts-ignore
                    model: Test
                }
            ]
        })

        const data: Test1 = res.dataValues
  
        data.test = (<any>data.test).dataValues
 
        return data


    }


}

let test1Init = new test1()

export default test1Init