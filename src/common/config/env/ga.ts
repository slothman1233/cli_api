/**
 * @description 正式环境配置文件
 * @author 文亮
 */

import { SESSION_SECRET_KEY } from '../constant'

export default {

    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'koa_ts',
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        keys: [SESSION_SECRET_KEY]
    },

}