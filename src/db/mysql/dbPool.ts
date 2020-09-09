/**
 * database connect pool utility
 * 数据库连接池工具类
 */
import mysql, { Pool } from 'mysql'
import config from '../../common/config/env'
import log from '../../common/utils/logger'
const dbConfig = config.mysql
let pool: Pool = null

/**
 * get the connection of database
 * 获取数据库连接
 */
export const getConnection = (callback: Function) => {
    if (!pool) {
        log.log('creating pool')
        pool = mysql.createPool(dbConfig)
    }
    pool.getConnection((err, connection) => {
        if (err || !connection) {
            log.error(err)
        } else {
            callback(connection)
        }
    })
}

/**
 * get the connection pool of database
 * 获取数据库连接池
 */
export const getPool = () => {
    if (!pool) {
        log.log('creating pool')
        pool = mysql.createPool(dbConfig)
    }
    return pool
}