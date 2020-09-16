/**
 * @description 常量集合
 * @author 文亮
 */



//crypto 加密的密钥
export const CRYPTO_SECRET_KEY = 'WEdfh123!@#++_'

//登录session的key
export const SESSION_SECRET_KEY = 'WESDSD23!@#++_FFFFA'

//router的变量
export const ROUTER_MAP = {
    /**
     * 控制器路径
     */
    CONTROLLER_PATH_METADATA: Symbol('controller_path_metadata'),

    /**
     * action 对象
     */
    ROUTER_META: Symbol('router_meta'),
    /**
    * 中间件对象
    */
    MIDDLEWARE: Symbol('middleware'),
}