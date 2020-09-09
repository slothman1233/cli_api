import http from 'http'
import qs from 'querystring'

/**
 * http get
 * @param  {String} url 
 * @param  {Object} form 
 */
function get(url: string, form: { [P: string]: any }) {
    return new Promise((resolve, reject) => {
        let body = ''
        http.get(url + '?' + qs.stringify(form), res => {
            res.setEncoding('utf8')
            res.on('data', data => {
                body += data
            })

            res.on('end', () => {
                resolve(body)
            }).on('error', err => {
                reject(err)
            })
        })
    })
}

/**
 * http request post
 * @param  {Object} form 
 */
function request(opt: { path: string }, form: { [P: string]: any }) {
    const postData = qs.stringify(form)
    const options = {
        hostname: '127.0.0.1',
        port: 80,
        path: opt.path,
        method: 'POST',
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
                resolve(body)
            })
        })

        req.on('error', err => {
            reject(err)
        })

        // post form
        req.write(postData)
        req.end()
    })
}

export {
    get,
    request
}