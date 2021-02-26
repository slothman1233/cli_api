import EventEmitter from 'events'

const emitter = new EventEmitter()
//防止缓存击穿


/**
 * 进入等待的队列
 * 
 * @export
 * @param {String} key 
 * @returns {any}
 */
export async function awaitData(key: string) {
    //返回一个Promise,外层已被async包装
    return new Promise(resolve => {
    //因为 emitter 注册监听器默认的最大限制是10，所以在并发多的时候出问题。需要动态调整数量
        emitter.setMaxListeners(emitter.getMaxListeners() + 1)
        //进入队列
        emitter.once(key, (data) => {
            //返回数据
            resolve(data)
            //减去当前监听器的数量
            emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0))
        })
    })
}

/**
 * 第一个请求向后台发起查询请求
 * 并且占位，告知后面的请求，这件事情我去办了，你们等着我回来就可以了
 * 
 * @export
 * @param {string} key 
 * @param {any} Fun 
 * @returns {any}
 */
export async function queryData(key: string, Fun: any) {
    // 这里是个关键，起到占位的用途，后面的请求会通过emitter.eventNames()去判断前面有没有请求去数据库了。也可以使用其他方式实现这个步骤
    //注册进events
    emitter.once(key, () => {})
    return new Promise(resolve => {
    //这里为去后台数据库请求的操作，这块使用setTimeout模拟异步操作


        //  setTimeout(() => {
        const data = Fun()
        //eimt 触发事件，将data传递给其他监听这个key的函数
        emitter.emit(key, data)
        //返回给第一个请求
        resolve(data)
        // }, 3000) // 为了效果明显可以时间再长点
    })
}
/**
 * 查询当前事件是否被监听，如果被监听说明有请求去数据库了，我也继续监听等待第一个回来
 * 
 * @export
 * @param {any} key 
 * @returns {boolean}
 */
export function hasEvent(key: string) {
    //查询所有事件监听器中有没有这个key
    return emitter.eventNames().includes(key)
}