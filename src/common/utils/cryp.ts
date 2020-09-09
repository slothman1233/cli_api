

import crypto from 'crypto'

//加密算法
import { CRYPTO_SECRET_KEY } from '../config/constant'


/**
 * md5 加密
 * @param {string} content 明文
 */
function md5(content: string) {
    const md5 = crypto.createHash('md5')
    //hex 16进制
    return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string}} content 明文
 */
function doCrypto(content: string) {
    const str = `${content}_${CRYPTO_SECRET_KEY}`
    return md5(str)
}


export default doCrypto