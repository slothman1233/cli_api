import { Document, Types } from "mongoose";
import IUser from "../model/user.model";
import mongoBase from "../tables/base.table";

// Schema: 相当于一个数据库的模板. Model可以通过mongoose.model 集成其基本属性内容. 当然也可以选择不继承.
// Model: 基本文档数据的父类,通过集成Schema定义的基本方法和属性得到相关的内容.
// instance: 这就是实实在在的数据了. 通过 new Model()初始化得到.

export interface IUserModel extends Document, IUser {}

const user = mongoBase<IUserModel>({
  tableName: "tts",
  definition: {
    // @ts-ignore
    username: { type: String, required: true },
    // @ts-ignore
    password: { type: String, required: true },
    // @ts-ignore
    nickname: { type: String, required: false },
    // @ts-ignore
    garden: { type: Number, default: 1, enum: [1, 2] },
    // @ts-ignore
    status: { type: Number, required: true, default: 0, enum: [0, 1, 2] },
  },
});
0;
export default user;
