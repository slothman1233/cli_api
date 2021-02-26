import config from '../common/config/env'
import http from '../common/utils/net'

const apiFMCompany = 'FMCompanyApi'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime } from '../enums/enums'



class company {
    /// <summary>
    /// 获取行业名录数据
    /// </summary>
    /// <param name="companyType"></param>
    /// <param name="companyName"></param>
    /// <param name="headquarters"></param>
    /// <param name="foundedTime"></param>
    /// <param name="pageIndex"></param>
    /// <param name="pageSize"></param>
    /// <returns></returns>
    @CacheInterceptor('company_services_FMCompanyApiService', CacheTime.Min3)
    async FMCompanyApiService(params: any) {
        return await http.get(`asdfasdf`, { params, codes: { sures: ['0'] } })
    }
}

let companys = new company()

export default companys