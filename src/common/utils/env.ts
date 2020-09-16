/**
 * @description 各种环境判断
 * @author 文亮
 */


const ENV = process.env.NODE_ENV

const ISDOCKER = process.env.DOCKER

//开发环境
export const isDev = ENV === 'dev'
export const notDev = ENV !== 'dev'

//测试环境
export const isTest = ENV === 'test'
export const notTest = ENV !== 'test'

//预发布环境
export const isPre = ENV === 'pre'
export const notPre = ENV !== 'pre'

//生产环境
export const isGa = ENV === 'ga'
export const notGa = ENV !== 'ga'
//单元测试环境
export const isJest = ENV === 'jest'
export const notJest = ENV !== 'jest'

//是否是docker
export const isDocker = ISDOCKER === 'docker'
export const notDocker = ISDOCKER !== 'docker'