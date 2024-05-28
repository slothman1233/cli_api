import {
  Model,
  model,
  Schema,
  SchemaDefinition,
  SchemaOptions,
  Document,
  SaveOptions,
  FilterQuery,
  DocumentQuery,
  Types,
  DocumentDefinition,
  AnyObject,
} from "mongoose";

type baseType = {
  tableName: string;
  definition?: SchemaDefinition;
  options?: SchemaOptions;
};
export type selectAllResType<T> = {
  projection?: any | null;
  conditions?: FilterQuery<T>;
  pageSize?: number;
  pageIndex?: number;
  sort?: string | any;
};

/**
 * mongodb 基座
 * @param  {string} tableName 表名
 * @param {SchemaDefinition} definition
 * @param {SchemaOptions} options
 */
export class mongoBase<T extends Document> extends Schema<T> {
  baseSchema: Schema<T>;
  //模型
  models: Model<T>;

  constructor({ tableName, definition, options = {} }: baseType) {
    // 自定义安全模式. w为写入的大小范围. wtimeout设置写入时限. 如果超出10s则返回error
    options = Object.assign(
      { autoIndex: false, write: "majority", wtimeout: 10000 },
      options
    );
    super(definition, options);

    if (!this.baseSchema) {
      this.baseSchema = new Schema<T>(definition, options);
    }

    this.models = model<T>(tableName, this.baseSchema, tableName);
  }

  /**
   * 插入数据
   * @param {(T | DocumentDefinition<T> | AnyObject)[]} doc
   * @param {SaveOptions} options
   */
  async create(
    doc: (T | DocumentDefinition<T> | AnyObject)[],
    options?: SaveOptions
  ) {
    const res = await this.models.create(doc, options);
    if (res) {
      return res;
    }
    return null;
  }

  /**
   * 根据条件删除数据
   * @param {FilterQuery<T>} conditionObj 删除条件
   * @returns {Promise<boolean>}
   */
  async deleteMany(conditionObj: FilterQuery<T>) {
    const res = await this.models.deleteMany(conditionObj);
    if (res && res.deletedCount > 0) {
      return true;
    }
    return false;
  }

  /**
   * 根据id删除数据
   * @param {any} id id
   * @returns {Promise<T>} 删除的数据
   */
  async deleteById(id: any): Promise<T> {
    const res = await this.models.findByIdAndDelete(id);
    if (!res) {
      return null;
    }
    return res;
  }

  /**
   * 根据条件更新数据
   * @param {Object} conditionObj 条件对象
   * @param {Object} data 数据对象
   * @returns {Promise<boolean>} 是否根据成功
   */
  async update<T>(conditionObj: any, data: any) {
    const res = await this.models.updateMany(conditionObj, data);
    return res.ok === 1;
  }

  /**
   * 查询数据
   * @param {number} pageIndex 页码
   * @param {number} pageSize 分页的数量 没有页码的情况下是limit的概念是提取多少limit跳数据
   * @param {string | any} sort 排序方式 1:升序, -1:降序.
   * @param {FilterQuery<T>} conditions 查询条件
   * @param {any | null} projection
   * 筛选出数据的具体字段
   * 第一种方式 只需要_id和username字段('_id username')
   * 第二种 筛选出 且只显示 _id和username {_id:1,username:1}  username:0  则为反选
   */
  select({
    pageIndex,
    pageSize,
    sort = { _id: -1 },
    conditions,
    projection,
  }: selectAllResType<T>) {
    console.log(conditions ? 1 : 2);
    let res = conditions
      ? this.models.find(conditions)
      : this.models.find({}, projection);
    if (pageIndex) {
      res = res.skip(pageIndex * pageSize);
    }
    if (pageSize) {
      res = res.limit(pageSize);
    }
    if (sort) {
      res = res.sort(sort);
    }
    return res;
  }

  /**
   * 根据条件查询数据
   * @param {FilterQuery<T>} conditions 条件
   * @param {any | null} projection
   * 筛选出数据的具体字段
   * 第一种方式 只需要_id和username字段('_id username')
   * 第二种 筛选出 且只显示 _id和username {_id:1,username:1}  username:0  则为反选
   */
  selectMany(conditions: FilterQuery<T>, projection?: any | null) {
    const res = this.select({ conditions });
    return res;
  }

  /**
   * 查询所有数据
   * @returns {Promise<T[]>} 查询结果
   * 筛选出数据的具体字段
   * 第一种方式 只需要_id和username字段('_id username')
   * 第二种 筛选出 且只显示 _id和username {_id:1,username:1}  username:0  则为反选
   */
  selectAll(projection?: any | null) {
    let res = this.select({ projection });
    return res;
  }

  /**
   * 根据id查询数据
   * @param { any } id
   * 筛选出数据的具体字段
   * 第一种方式 只需要_id和username字段('_id username')
   * 第二种 筛选出 且只显示 _id和username {_id:1,username:1}  username:0  则为反选
   * @returns {Promise<T>} 查询的结果
   */
  selectById(id: any, projection?: any | null) {
    id = Types.ObjectId.createFromHexString(id);
    const res = this.models.findById(id, projection);
    return res;
  }

  /**
   * 分页查询
   * @param pageSize
   * @param pageIndex
   * @param sort  1:升序, -1:降序.
   * @returns {Promise<T[]>} 分页的数据
   */
  selectPageQuery({
    pageIndex = 0,
    pageSize = 10,
    sort,
    conditions,
  }: selectAllResType<T>) {
    const res = this.select({ pageIndex, pageSize, sort, conditions });
    return res;
  }

  /**
   * 查询数据长度
   * @param {FilterQuery<T>} conditions 查询条件
   * @returns {Promise<number>} 长度
   */
  Count(conditions?: FilterQuery<T>) {
    const res = this.models.countDocuments(conditions);
    return res;
  }
}

/**
 * mongodb 基座
 * @param  {string} tableName 表名
 * @param {SchemaDefinition} definition
 * @param {SchemaOptions} options
 */
export default function <T extends Document>({
  tableName,
  definition,
  options,
}: baseType) {
  return new mongoBase<T>({ tableName, definition, options });
}
