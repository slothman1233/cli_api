// import http from 'http'
// import qs from 'querystring'
// import { SuccessModel, ErrorModel } from '../../model/resModel'

import HttpService from '@stl/request'
import log from '../../middleware/log4js/log'
// import HttpService from './src'

// type requestModel = {
//     path: string,
//     hostname?: string,
//     port?: number,
//     method?: string
// }

// type postModel = {
//     path: string,
//     hostname?: string,
//     port?: number
// }


const http = new HttpService('', {
    //默认的错误打印
    errorFn: (e: any) => {
        const { response, config, code } = e

        log.error({
            error: `
*************** error log start ***************
error: ${e}
method: ${config.method}
code: ${code}
url:  ${config.url}
query: ${config.data}
time: ${config.timeout}
headers: ${JSON.stringify(config.headers)}
status:${response ? response.status : 404}
${e} 
*************** error log end ***************
        `})
    }
})

export default http
