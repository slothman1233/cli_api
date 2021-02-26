

import { CacheTime } from '../../enums/enums'
import { bodyModel } from '../../model/resModel'
import microCache from '../utils/microcache'
import { awaitData, hasEvent, queryData } from './CacheBreakdown'





let cache = new microCache()
let timeTaskAry: any = {}

//获取key
function getkey(key: string, arg: any[]) {
    let data = arg[0]
    try {
        data = JSON.stringify(arg[0])
    } catch (e) { }
    let cacheName = `${key}_${data}`

    return cacheName
}

//定时任务
function timeTask(key: string, CacheSeconds: number, arg: any[], method: Function, proto: Object) {
    let cacheName = getkey(key, arg)
    //如果存在则跳过
    if (Object.keys(timeTaskAry).indexOf(cacheName) >= 0) { return }

    process.nextTick(() => settime(key, CacheSeconds, arg, method, proto))

}

function settime(key: string, CacheSeconds: number, arg: any[], method: Function, proto: Object) {
    let cacheName = getkey(key, arg)
    timeTaskAry[cacheName] = setTimeout(async () => {
        let val: bodyModel<any> = await method.apply(proto.constructor, arg)
        if (val.subcode !== '') {
            cache.set(cacheName, val)
        }
        process.nextTick(() => settime(key, CacheSeconds, arg, method, proto))
    }, CacheSeconds * 1000)


}



/**
 * 缓存拦截 装饰器
 * @param {string} key 名称
 * @param {string} CacheSeconds 缓存时间
 * @return {void}
 */
export default function CacheInterceptor(key: string, CacheSeconds: CacheTime) {
    return (proto: Object, name: string | symbol, descriptor: TypedPropertyDescriptor<Function>) => {
        let method = descriptor.value
        descriptor.value = async function (...arg: any[]) {
            //定时任务的执行
            timeTask(key, CacheSeconds, arg, method, proto)

            let cacheName = getkey(key, arg)

            let getCache = cache.get(cacheName)

            if (getCache && getCache !== null) {
                return Promise.resolve(getCache)
            }


            let val:bodyModel<any>
            try {
            
                //防止缓存击穿
                if (hasEvent(cacheName)) {
                    val = await awaitData(cacheName)
                    // console.log(`await::${JSON.stringify(val)}--${cacheName}`)
                } else {
                    val = await queryData(cacheName, async () => await method.apply(proto.constructor, arg))
                    // console.log(`queryData::${JSON.stringify(val)}--${cacheName}`)
                }

                // val = await method.apply(proto.constructor, arg)

                if (val.subcode !== '') {
                    cache.set(cacheName, val)
                } else {
                    cache.set(cacheName, null)
                }

            } catch (e) { }

            return val
        }

    }
}