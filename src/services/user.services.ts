import { FilterQuery, SaveOptions } from "mongoose";
import { selectAllResType } from "src/db/mongodb/tables/base.table";
import user, { IUserModel } from "../db/mongodb/mapping/user.mapping";

import ITest1 from "src/db/mongodb/model/test1.model";
import IUser from "../db/mongodb/model/user.model";

/**
 * 获取用户信息
 */
async function selectAll(): Promise<IUserModel[]> {
  return await user.selectAll();
}

/**
 * 根据id查询用户信息
 * @param {any} id 用户id
 */
async function selectById(id: any): Promise<IUserModel> {
  const res = await user.selectById(id);
  return res;
}

/**
 * 根据条件获取数据
 * @param {FilterQuery<T>} conditions 查询条件
 * @param {any | null} projection
 * 筛选出数据的具体字段
 * 第一种方式 只需要_id和username字段('_id username')
 * 第二种 筛选出 且只显示 _id和username {_id:1,username:1}  username:0  则为反选
 */
async function selectmany(
  conditions: FilterQuery<IUserModel>,
  projection?: any | null
) {
  const res = await user.selectMany(conditions);
  return res;
}
/**
 * 分页查询
 * @param pageSize
 * @param pageIndex
 * @param sort  1:升序, -1:降序.
 * @returns {Promise<IUserModel[]>} 分页的数据
 */
async function selectPageQuery({
  pageIndex = 0,
  pageSize = 10,
  sort,
  conditions,
}: selectAllResType<IUserModel>) {
  const res = await user.selectPageQuery({
    pageIndex,
    pageSize,
    sort,
    conditions,
  });
  return res;
}
/**
 * 查询数据长度
 * @param {FilterQuery<T>} conditions 查询条件
 * @returns {Promise<number>} 长度
 */
async function selectCount(
  conditions?: FilterQuery<IUserModel>
): Promise<number> {
  const res = await user.Count(conditions);
  return res;
}
/**
 * 根据条件更新数据
 * @param {Object} conditionObj 条件对象
 * @param {Object} data 数据对象
 * @returns {Promise<boolean>} 是否根据成功
 */
async function update(conditionObj: any, data: IUserModel): Promise<boolean> {
  const res = await user.update(conditionObj, data);
  return res;
}

/**
 * 根据id删除数据
 * @param {any} id id
 * @returns {Promise<T>} 删除的数据
 */
async function deleteById(id: string): Promise<IUserModel> {
  const res = await user.deleteById(id);
  return res;
}

/**
 * 根据条件删除数据
 * @param {FilterQuery<T>} conditionObj 删除条件
 * @returns {Promise<boolean>}
 */
async function deleteMany(
  conditionObj: FilterQuery<IUserModel>
): Promise<boolean> {
  const res = await user.deleteMany(conditionObj);
  return res;
}

/**
 * 插入数据
 * @param {<T>} doc
 * @param {SaveOptions} options
 */
async function create(doc: IUser, options?: SaveOptions) {
  // @ts-ignore
  const res = await user.create(doc, options);
  return res;
}

export {
  selectAll,
  selectById,
  selectmany,
  selectPageQuery,
  selectCount,
  update,
  deleteById,
  deleteMany,
  create,
};
