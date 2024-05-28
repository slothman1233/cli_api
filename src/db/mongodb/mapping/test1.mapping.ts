import { Document, Types } from "mongoose";
import ITest1 from "../model/test1.model";
import mongoBase from "../tables/base.table";

// Schema: 相当于一个数据库的模板. Model可以通过mongoose.model 集成其基本属性内容. 当然也可以选择不继承.
// Model: 基本文档数据的父类,通过集成Schema定义的基本方法和属性得到相关的内容.
// instance: 这就是实实在在的数据了. 通过 new Model()初始化得到.

export interface ITest1Model extends Document, ITest1 {}

const test1 = mongoBase<ITest1Model>({
  tableName: "test1",
  definition: {
    // mongodb 是非关系型的数据库 尽量不使用连表查询
    //这里即为子表的外键，关联主表。  ref后的blog代表的是关联表为blog的Model。
    // @ts-ignore
    userId: { type: Types.ObjectId, required: true, ref: "tts" },
    // @ts-ignore
    content: { type: String, required: true },
  },
});

export default test1;
