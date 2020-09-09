import 'reflect-metadata'
import fs from 'fs'
import path from 'path'
import { ROUTER_MAP } from './common/config/constant'
import { RouteMeta } from './common/type/type'
const {ROUTER_META, CONTROLLER_PATH_METADATA } = ROUTER_MAP
import Router from 'koa-router'

/**
 * 路由的初始化
 * @param {Router} router koa-router
 */
const addRouter = (router: Router) => {
    const ctrPath = path.join(__dirname, 'routes')
 
    
    const modules: ObjectConstructor[] = []
    // 扫描controller文件夹，收集所有controller
    fs.readdirSync(ctrPath).forEach(name => {
        if (/^[^.]+\.(t|j)s$/.test(name)) {
            modules.push(require(path.join(ctrPath, name)).default)
        }
    })
    // 结合meta数据添加路由 和 验证
    modules.forEach(m => {
        
        const ControllerPath = sprit(Reflect.getMetadata(CONTROLLER_PATH_METADATA, m) || `${m.name.toLowerCase()}`)

        const RouteMap:Array<RouteMeta> = Reflect.getMetadata(ROUTER_META, m)
           
        RouteMap.map(item => {
            const { name, path: ActionPath, method } = item
            const ctr = new m()
            const RoutePath = ControllerPath + sprit(ActionPath)
            router[method](RoutePath, ctr[name])
        })

     
    })

    
}

/**
 * 在字符串头插入  / 
 * @param {string} str 
 */
function sprit(str:string):string{
    return str[0] === '/' ? str : `/${str}`
}

export default addRouter