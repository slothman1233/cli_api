type pageTypeModel<T> = {
  /// <summary>
  /// 当前页码
  /// </summary>
  PageIndex?: number,
  /// <summary>
  /// 总记录数
  /// </summary>
  TotalCount?: number,
  /// <summary>
  /// 总页数
  /// </summary>
  TotalPages?: number,
  /// <summary>
  /// 每页记录数
  /// </summary>
  PageSize?: number,
  PageDatas?: T[]
}

//分页模型
class PageModel<T> {
  /// <summary>
  /// 当前页码
  /// </summary>
  PageIndex: number
  /// <summary>
  /// 总记录数
  /// </summary>
  TotalCount: number
  /// <summary>
  /// 总页数
  /// </summary>
  TotalPages: number
  /// <summary>
  /// 每页记录数
  /// </summary>
  PageSize: number
  PageDatas: T[]
  constructor({ PageIndex, TotalCount, TotalPages, PageDatas, PageSize = 10 }: pageTypeModel<T>) {
      this.PageIndex = PageIndex
      this.TotalCount = TotalCount
      this.TotalPages = TotalPages < 0 ? TotalPages : parseInt((TotalCount / PageSize).toString())
      this.PageDatas = PageDatas
  }
}


export {
    PageModel,
    pageTypeModel 
}