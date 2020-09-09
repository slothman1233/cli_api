/**
 * @description sequelize 链接
 * @author 文亮
 */

import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import conf from '../../common/config/env'

import log from '../../common/utils/logger'


const dbConfig = conf.mysql


//sequelize 的初始化设置
type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
const getdialect: Dialect = 'mysql'
const config = {
    dialect: getdialect,
    database: dbConfig.database,
    username: dbConfig.user,
    password: dbConfig.password,
    models: [path.resolve(__dirname, `./mapping`)], // or [Player, Team],
    define: {
        paranoid: true, //开启软删除
        underscored: false, //下划线
        charset: 'utf8',
        freezeTableName: true, //固定表明为单数  默认表名是xxxs

        timestamps: true, //开启时间戳 create_at delete_at update_at
        createdAt: 'createTime',  //自定义创建字段的名字
        updatedAt: 'updateTime', // 自定义修改字段的名字
        deletedAt: 'deleteTime' //自定义删除字段的名字
    },
    pool: {
        max: 5, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        acquire: 30000,
        idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    }
}

async function sequelizeInit(){
    
     
    //创建与数据库的链接、初始化模型
    const sequelize = new Sequelize(config)
    //sequelize跟数据库对应的表进行连接
    sequelize.addModels([path.resolve(__dirname, `./mapping/`)])

    sequelize.authenticate().then(async () => {
        log.log('数据库连接成功')



    })
        .catch(err => {
            log.error('无法连接到数据库', err)
        })

}


// 同步数据库  创建所有的数据库
// createTables()
export default sequelizeInit