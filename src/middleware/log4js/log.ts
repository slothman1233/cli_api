
import log4js from './index'
import { Context } from 'koa'
import { isDev, isDocker } from '../../common/utils/env'

let errorLog = log4js.getLogger('errorLog') //此处使用category的值
let resLog = log4js.getLogger('responseLog') //此处使用category的值
let debugLog = log4js.getLogger('debugLog')

if(isDocker || isDev){
    resLog.info = console.log
    errorLog.error = console.error
    debugLog.debug = console.log
}


const info = function (ctx: Context, resTime: number) {
    if (ctx) {
        resLog.info(formatRes(ctx, resTime))
    }
}

const error = function (ctx: Context, error: any, resTime: number) {
    if (ctx && error) {
        errorLog.error(formatError(ctx, error, resTime))
    }
}

const _log = function (str: string): void {
    try {
        if (!str) {
            debugLog.debug('null')
            return
        }
        debugLog.debug(str)
    } catch (err) {
        debugLog.debug(`logError  ---  message:${err.message} ----    stack: ${err.stack}`)
    }
}

const log = { info, error, log: _log }

//格式化请求日志
const formatReqLog = function (ctx: Context, resTime: number): string {

    let getClientIp = function (ctx: Context) {
        const req = ctx.req
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (<any>req.connection).socket.remoteAddress || ''
    }
    let ip = getClientIp(ctx).match(/\d+.\d+.\d+.\d+/) || getClientIp(ctx)

    let logText = ''
    //访问方法
    let method = ctx.method
    logText += 'request method: ' + method + '\n'
    //请求原始地址

    logText += 'request originalUrl:  ' + ctx.originalUrl + '\n'
    //客户端ip
    logText += 'request client ip:  ' + ip + '\n'

    //请求参数
    if (method === 'GET') {
        logText += 'request query:  ' + JSON.stringify(ctx.query) + '\n'
    } else {
        logText += 'request body: ' + '\n' + JSON.stringify(ctx.request.body) + '\n'
    }

    //服务器响应时间
    logText += 'response time: ' + resTime + '\n'

    return logText
}

//格式化响应日志
const formatRes = function (ctx: Context, resTime: number) {
    let logText = new String()
    //响应日志开始
    logText += '\n' + '*************** response log start ***************' + '\n'

    //添加请求日志
    logText += formatReqLog(ctx, resTime)

    //响应状态码
    logText += 'response status: ' + ctx.res.statusCode + '\n'

    //响应内容
    logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n'

    //响应日志结束
    logText += '*************** response log end ***************' + '\n'

    return logText
}

//格式化错误日志
const formatError = function (ctx: Context, err: any, resTime: number) {
    let logText = new String()

    //错误信息开始
    logText += '\n' + '*************** error log start ***************' + '\n'

    //添加请求日志
    logText += formatReqLog(ctx, resTime)

    //错误名称

    logText += 'err name: ' + err.name + '\n'
    //错误信息

    logText += 'err message: ' + err.message + '\n'
    //错误详情

    logText += 'err stack: ' + err.stack + '\n'

    //错误信息结束
    logText += '*************** error log end ***************' + '\n'

    return logText
}

export default log