/**
 * @description 各种环境判断
 * @author 文亮
 */


const ENV = process.env.NODE_ENV

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
export const noJest = ENV !== 'jest'