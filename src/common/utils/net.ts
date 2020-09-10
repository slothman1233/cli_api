import http from 'http'
import qs from 'querystring'
import { SuccessModel, ErrorModel } from '../../model/resModel'

type requestModel = {
    path: string,
    hostname?: string,
    port?: number,
    method?: string
}

type postModel = {
    path: string,
    hostname?: string,
    port?: number
}


/**
 * http get
 * @param  {String} url 
 * @param  {Object} form 
 */
function get(url: string, form?: { [P: string]: any }) {
    return new Promise((resolve, reject) => {
        let body = ''
        http.get(url + '?' + qs.stringify(form), res => {
            res.setEncoding('utf8')
            res.on('data', data => {
                body += data
            })

            res.on('end', () => {
                let data = body
                try {
                    data = JSON.parse(body)
                } catch (e) {

                }

                resolve(new SuccessModel({
                    bodymessage: data,
                    subcode: 1233213,
                    message: '成功'
                }))

            }).on('error', err => {
                reject(
                    new ErrorModel({
                        bodymessage: null,
                        subcode: 1233213,
                        message: `message:${err.message},stack:${err.stack}`
                    })
                )
            })
        })
    })
}

/**
 * http post
 * @param  {Object} form 
 */
function post(opt: postModel, form: { [P: string]: any }) {
    return request(opt, form)
}

/**
 * http request post
 * @param  {Object} form 
 */
function request(opt: requestModel, form: { [P: string]: any }) {
    const postData = qs.stringify(form)
    const options = {
        hostname: opt.hostname || '127.0.0.1',
        port: opt.port || 3001,
        path: opt.path,
        method: opt.method || 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)//post必须加这个
        }
    }

    return new Promise((resolve, reject) => {
        let body = ''
        const req = http.request(options, res => {
            res.setEncoding('utf8')
            res.on('data', chunk => {
                body += chunk
            })
            res.on('end', () => {
                const firstCode = body.charCodeAt(0)//限定返回json格式,即第一个字符为"{"
                if (firstCode !== 123) {
                    reject(new Error('server return unexpect data: ' + body))
                }
                let data = body
                try {
                    data = JSON.parse(body)
                } catch (e) {

                }

                
                resolve(new SuccessModel({
                    bodymessage: data,
                    subcode: 1233213,
                    message: '成功'
                }))
            })
        })

        req.on('error', err => {
            reject(
                new ErrorModel({
                    bodymessage: null,
                    subcode: 1233213,
                    message: `message:${err.message},stack:${err.stack}`
                })
            )
        })

        // post form
        req.write(postData)
        req.end()
    })
}

export {
    get,
    post,
    request
}