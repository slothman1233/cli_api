/**
 * @description services 跟数据库打交道
 * @author 文亮
 */

import { Test, Test1 } from '../db/sequelize/map'
import log from '../common/utils/logger'
import { CreateOptions, UpdateOptions } from 'sequelize/types'




/**
 *  添加
 * @param {Object} param0 { name, weight}
 */
async function addTest({ name, weight }: { name: string, weight: number }) {
    const res = await Test.createItem<Test>(
    // @ts-ignore
        {
            name,
            weight
        }
    )
    return res

}

/**
 * 修改字段
 * @param {Object} param0 { name, weight}
 * @param {Object} options 查询条件 { name }
 */
async function updateTest({ name: newName, weight: newWeight }: { name: string, weight: number }, { name }: { name: string }) {
    // 拼接修改内容
    let updateData: any = {}
    if (newName) { updateData.name = newName }
    if (newWeight) { updateData.weight = newWeight }

    // 拼接查询条件
    let whereData: any = {}
    if (name) {
        whereData.name = name
    }

    // 执行修改
    const res = await Test.updateItem<Test>(updateData, {
        where: whereData
    })

    return res // 修改的行数
}

/**
 * 根据id修改数据
 * @param {Object} param0 { name, weight}
 * @param {number} id id
 */
async function updateTestById({ name: newName, weight: newWeight }: { name: string, weight: number }, id: number) {
    let updateData: any = {}
    if (newName) { updateData.name = newName }
    if (newWeight) { updateData.weight = newWeight }
    const res = await Test.updateItemById<Test>(updateData, id)
    return res
}

/**
 * 获取所有的字段
 * @return {Array<Object>} object
 */
async function getTestList() {
    const res = await Test.getList<Test>()

    return res
}

/**
 * 根据id获取数据
 * @param {number} id  id
 * @return {Object}
 */
async function getTestById(id: number) {
    const res = await Test.getById<Test>(id)
    return res

}

/**
 * 删除某条数据（软删除）
 * @param id 
 */
async function delTestById(id: number) {
    const res = await Test.deleteById(id)
    return res
}


/**
 * 连表查询  HasMany 1对多
 * @param id 
 */
async function HasManyTest1(id:number) {
    const res: any = await Test.findOne({
        where: {
            id: 1
        },
       
        include: [{
            // @ts-ignore
            model: Test1
        }],
    })

    const data: Test = res.dataValues

    data.test1 = data.test1.map(test => {
        return (<any>test).dataValues
    })

    return data

}




export { addTest, updateTest, updateTestById, getTestList, getTestById, delTestById, HasManyTest1 }