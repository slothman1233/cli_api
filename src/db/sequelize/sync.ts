/**
 * @description 数据库的创建  不建议使用   请直接在数据库创建表
 * @author 文亮
 */
import { Sequelize } from 'sequelize-typescript'



/**
 * 同步数据库  创建所有的数据库
 * @param {Object} options 同步数据库方式
    *  force true 强制重新创建数据库 如果存在则删除数据库后重新创建
    *  动态同步
    *  修改同名数据表结构，以适用模型。
    *  alter: true 只添加 添加新的字段
 */
async function createTables(sequelize: Sequelize, options = { alter: true }) {
    // force true 如果存在则删除数据库重新创建
    sequelize.sync(options).then(() => {
        process.exit()
    })
}


// sequelize.sync({ alter: true }) // 即可添加新的字段

export { createTables }

