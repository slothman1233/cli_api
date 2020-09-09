/**
 * @description swagger 路由
 * @author 文亮
 */
import path from 'path'

import { SwaggerRouter } from 'koa-swagger-decorator'

const koaRouterOpts = {prefix: '/api'}

// SwaggerRouter 继承自 koa-router
const router = new SwaggerRouter(koaRouterOpts) 

// http://localhost:3000/api/swagger-html
router.swagger({
    title: 'swagger',
    description: 'API DOC',
    version: '1.0.0',

    // [optional] default is root path.
    // if you are using koa-swagger-decorator within nested router, using this param to let swagger know your current router point
    //如果你正在使用koa-swagger-decorator内嵌式路由器，使用这个参数让swagger知道你当前的路由器点
    // prefix: '/api',

    // [optional] default is /swagger-html
    swaggerHtmlEndpoint: '/swagger-html',

    // [optional] default is /swagger-json
    swaggerJsonEndpoint: '/swagger-json',

    // [optional] additional options for building swagger doc
    // eg. add api_key as shown below
    swaggerOptions: {
        securityDefinitions: {
            api_key: {
                type: 'apiKey',
                in: 'header',
                name: 'api_key',
            },
        },
    },
    // [optional] additional configuration for config how to show swagger view
    // 附加配置配置如何显示swagger视图
    swaggerConfiguration: {
        display: {
            defaultModelsExpandDepth: 4, // The default expansion depth for models (set to -1 completely hide the models).
            defaultModelExpandDepth: 3, // The default expansion depth for the model on the model-example section.
            docExpansion: 'list', // Controls the default expansion setting for the operations and tags. 
            defaultModelRendering: 'model' // Controls how the model is shown when the API is first rendered. 
        }
    }
})
// map all static methods at Test class for router
// router.map(Test);

// mapDir will scan the input dir, and automatically call router.map to all Router Class
//router.mapDir(path.resolve(__dirname), {
// default: true. To recursively scan the dir to make router. If false, will not scan subroutes dir
// recursive: true,
// default: true, if true, you can call ctx.validatedBody[Query|Params] to get validated data.
// doValidation: true,
// default: [], paths to ignore while looking for decorators 
// ignore: ["**.spec.ts"],
//})

// doValidation?: boolean;
// recursive?: boolean;
// [name: string]: any;
// ignore?: string[];

// 查找对应目录下的controller类
router.mapDir(path.resolve(__dirname, './routes/'), {
    ignore: ['**/**.spec.ts', '**/**.test.ts'],
})

export default router