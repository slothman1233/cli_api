/**
 * @description redis的创建和使用
 * @author 文亮
 */

import redis from 'redis'
import config from '../../common/config/env'

const { redis: redis_conf } = config
const redisClient = redis.createClient(redis_conf.port, redis_conf.host)

redisClient.on('error', (err) => {
    console.error(err)
})

/**
 * 存redis
 * @param {string} key 键
 * @param {string} value 值
 * @param {number} timeout 过期时间 单位 s
 */
function redisSet(key: string, value: string, timeout: number = 60 * 60) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
    redisClient.expire(key, timeout)
}

/**
 * 取redis
 * @param {sring} key 键
 * @return {Promise} 
 */
function redisGet(key: string) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
            if (err) {
                reject(err)
                return
            }

            if (value === null) {
                resolve(null)
                return
            }

            try {
                resolve(JSON.parse(value))
            } catch (err) {
                resolve(resolve)
            }
        })

    })
    return promise
}

function end() {
    redisClient.quit()
}

export {
    redisClient,
    redisSet,
    redisGet,
    end
}
