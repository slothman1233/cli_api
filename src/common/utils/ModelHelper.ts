import { bodyModel } from '../../model/resModel'


/// <summary>
/// 反序列化
/// </summary>
/// <param name="code">ReturnModel 状态码：0 可反序列化</param>
/// <param name="value"></param>
/// <returns></returns>
export function JSONParse<T>(code: number, value: any): T | null {
    try {
        return code === 0 && value ? JSON.parse(value) : null
    }
    catch
    {
        return code === 0 && value ? value : null
    }
}
