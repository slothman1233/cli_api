/**
 * @description 日志组件
 * @author 文亮
 */


/**
 * 日志工具
 */
class _log {

    //错误日志
    log(...args: any[]): void {
        console.log(args.join())
    }

    //普通日志
    error(...args: any[]): void {
        console.error(args.join())
    }
}

// 日志组件
const log = new _log()


export default log




