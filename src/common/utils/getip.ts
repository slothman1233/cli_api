

import koa, { Context } from 'koa'
//获取ip（内网或外网）
export const getIp = function (ctx: Context) {
    let { req } = ctx
    let ipStr = req.headers['X-Real-IP'] || req.headers['x-forwarded-for']

    if (ipStr && !Array.isArray(ipStr)) {

        let ipArray: string[] = ipStr.split(',')

        if (ipArray || ipArray.length > 0) { //如果获取到的为ip数组

            return ipArray[0]

        }
        return ''

    } else { //获取不到时

        return ctx.ip.substring(ctx.ip.lastIndexOf(':') + 1)

    }

}


//获取本机ip地址
export const getIPAdress = function () {
    let interfaces = require('os').networkInterfaces()
    console.log(interfaces)
    for (let devName in interfaces) {
        let iface = interfaces[devName]
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i]
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}

//获取外网ip
export const getNetIp = function (ctx: Context) {
    let { req } = ctx
    let ipStr = req.headers['X-Real-IP'] || req.headers['x-forwarded-for']

    if (ipStr && !Array.isArray(ipStr)) {

        let ipArray: string[] = ipStr.split(',')

        if (ipArray.length > 1) { //如果获取到的为ip数组

            for (let i = 0; i < ipArray.length; i++) {

                let ipNumArray: string[] = ipArray[i].split('.')

                let tmp: string = ipNumArray[0] + '.' + ipNumArray[1]

                if (tmp === '192.168' || (ipNumArray[0] === '172' && ipNumArray[1] >= '16' && ipNumArray[1] <= '32') || tmp === '10.7') {

                    continue

                }

                return ipArray[i]

            }

        }

        return ipArray[0]

    } else { //获取不到时

        return ctx.ip.substring(ctx.ip.lastIndexOf(':') + 1)

    }

}


//通过req的hearers来获取客户端ip
export let getClientIp = function (ctx: Context | koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext>) {
    let { req } = ctx
    let ip = req.headers['X-Real-IP'] || req.headers['x-forwarded-for'] || ctx.ip || req.connection.remoteAddress || req.socket.remoteAddress || (<any>req.connection).socket?.remoteAddress || ''

    if (typeof ip === 'string' && ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }

    ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length)
    return ip
}



