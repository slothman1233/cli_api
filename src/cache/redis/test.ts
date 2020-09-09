/**
 * @description redis的实例
 * @author 文亮
 */

import { redisSet, redisGet } from './_redis'
const SQUARE_KEY = 'koa:square:'

/**
 * 示例
 * @param {number} pageSize 
 * @param {number} pageIndex 
 */
async function getSquareCacheList(pageSize: number, pageIndex: number) {
    const key = `${SQUARE_KEY}${pageIndex}_${pageSize}`

    const cacheRes = await redisGet(key)

    if (cacheRes !== null) {
        return cacheRes
    }

    const res = '3232323'

    // const res = await getBlogList({ pageSize, pageIndex })

    redisSet(key, res, 60)

    return res
}


export default getSquareCacheList