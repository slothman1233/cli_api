/**
 * @description index 的 controller
 * @author 文亮
 */
import Test1 from "../services/test1.services";
import { SuccessModel, ErrorModel, bodyModel } from "../model/resModel";

import user, { IUserModel } from "../db/mongodb/mapping/user.mapping";
import IUser from "../db/mongodb/model/user.model";
import {
  create,
  deleteById,
  deleteMany,
  selectAll,
  selectById,
  selectCount,
  selectmany,
  selectPageQuery,
  update,
} from "../services/user.services";
import { FilterQuery, SaveOptions } from "mongoose";
import { selectAllResType } from "src/db/mongodb/tables/base.table";

/**
 * 测试示例
 */
async function testBelongs() {
  const res = await Test1.BelongsToTest();

  return new SuccessModel({
    bodyMessage: res,
    subcode: 1233213,
    message: "成功",
  });
}

async function testpostC(res: any) {
  return new SuccessModel({
    bodyMessage: res,
    subcode: 1233213,
    message: "成功",
  });
}

/**
 * 查询所有的用户信息
 */
async function mongodb_getuserinfo(): Promise<SuccessModel<IUser[]>> {
  try {
    const res = await selectAll();
    return new SuccessModel({
      bodyMessage: res,
      subcode: 1233213,
      message: "成功",
    });
  } catch (err) {
    return new ErrorModel({
      message: err.message,
      bodyMessage: null,
      subcode: 1123123,
    });
  }
}

/**
 * 根据id查询用户信息
 * @param {Types.ObjectId} id 用户id
 */
async function mongodb_getuserbyid(id: string): Promise<SuccessModel<IUser>> {
  try {
    const res = await selectById(id);

    return new SuccessModel({
      bodyMessage: res,
      subcode: 1233213,
      message: "成功",
    });
  } catch (err) {
    return new ErrorModel({
      message: err.message,
      bodyMessage: null,
      subcode: 123123123,
    });
  }
}

/**
 * 根据条件获取数据
 * @param {FilterQuery<T>} conditions 查询条件
 */
async function mongodb_selectmany(conditions: FilterQuery<IUserModel>) {
  try {
    const res = await selectmany(conditions);
    return new SuccessModel({
      bodyMessage: res,
      subcode: 1233213,
      message: "成功",
    });
  } catch (err) {
    return new ErrorModel({
      message: err.message,
      bodyMessage: null,
      subcode: 123123123,
    });
  }
}

/**
 * 分页查询
 * @param pageSize
 * @param pageIndex
 * @param sort  1:升序, -1:降序.
 * @returns {Promise<IUserModel[]>} 分页的数据
 */
async function mongodb_selectPageQuery({
  pageIndex = 0,
  pageSize = 10,
  sort,
  conditions,
}: selectAllResType<IUserModel>) {
  try {
    const res = await selectPageQuery({
      pageIndex,
      pageSize,
      sort,
      conditions,
    });

    const count = await selectCount(conditions);
    return new SuccessModel({
      bodyMessage: {
        pageTotal: count,
        data: res,
      },

      subcode: 1233213,
      message: "成功",
    });
  } catch (err) {
    return new ErrorModel({
      message: err.message,
      bodyMessage: null,
      subcode: 123123123,
    });
  }
}

/**
 * 根据条件更新数据
 * @param {Object} conditionObj 条件对象
 * @param {Object} data 数据对象
 * @returns {Promise<boolean>} 是否根据成功
 */
async function mongodb_update(
  conditionObj: any,
  data: IUserModel
): Promise<bodyModel<boolean>> {
  try {
    const res = await update(conditionObj, data);
    return new SuccessModel({
      bodyMessage: res,
      subcode: 1233213,
      message: "成功",
    });
  } catch (err) {
    return new ErrorModel({
      message: err.message,
      bodyMessage: null,
      subcode: 123123123,
    });
  }
}

/**
 * 根据id删除数据
 * @param {any} id id
 * @returns {Promise<T>} 删除的数据
 */
async function mongodb_deleteById(id: any): Promise<bodyModel<IUser>> {
  try {
    const res = await deleteById(id);
    return new SuccessModel({
      bodyMessage: res,
      subcode: 1233213,
      message: "成功",
    });
  } catch (err) {
    return new ErrorModel({
      message: err.message,
      bodyMessage: null,
      subcode: 123123123,
    });
  }
}

/**
 * 根据条件删除数据
 * @param {FilterQuery<T>} conditionObj 删除条件
 * @returns {Promise<boolean>}
 */
async function mongodb_deleteMany(
  conditionObj: FilterQuery<IUserModel>
): Promise<bodyModel<boolean>> {
  try {
    const res = await deleteMany(conditionObj);
    return new SuccessModel({
      bodyMessage: res,
      subcode: 1233213,
      message: "成功",
    });
  } catch (err) {
    return new ErrorModel({
      message: err.message,
      bodyMessage: null,
      subcode: 123123123,
    });
  }
}
/**
 * 插入数据
 * @param {CreateQuery<T>} data
 * @param {SaveOptions} options
 */
async function mongodb_create(data: IUser, options?: SaveOptions) {
  try {
    const res = await create(data, options);
    return new SuccessModel({
      bodyMessage: res,
      subcode: 1233213,
      message: "成功",
    });
  } catch (err) {
    return new ErrorModel({
      message: err.message,
      bodyMessage: null,
      subcode: 123123123,
    });
  }
}

export {
  testBelongs,
  testpostC,
  mongodb_getuserinfo,
  mongodb_getuserbyid,
  mongodb_selectmany,
  mongodb_selectPageQuery,
  mongodb_update,
  mongodb_deleteById,
  mongodb_deleteMany,
  mongodb_create,
};
