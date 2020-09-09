/**
 * @description 用于http请求的单元测试
 * @author 文亮
 */

import request from 'supertest'
import app from '../src/app'
const server = app.callback()
// const req = request(server)

export default request(server)