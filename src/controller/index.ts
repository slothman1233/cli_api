/**
 * @description index 的 controller
 * @author 文亮
 */
import * as Test1 from '../services/test1.services'
import { SuccessModel, ErrorModel } from '../model/resModel'

/**
 * 测试示例
 */
async function testBelongs(){ 
   
    const res = await Test1.BelongsToTest()

    return new SuccessModel({
        bodymessage: res,
        subcode: 1233213,
        message: '成功'
    })

}


export {
    testBelongs
}