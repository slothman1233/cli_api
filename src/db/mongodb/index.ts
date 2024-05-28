import mongoose from "mongoose";
import log from "../../middleware/log4js/log";

import user from "./mapping/user.mapping";
import test1 from "./mapping/test1.mapping";
import env from "../../common/config/env";

mongoose.connect(
  env.mongodb,
  {
    // config: { autoIndex: false },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  async (err) => {
    if (err) {
      log.log("数据库连接失败：" + err);
    } else {
      log.log("数据库连接成功");
      //const data = await user.selectAll()
      // user.update<any>({ _id: '5f69950b90ce5e1f6c4a4bb4' }, {
      //     username: '444'
      // })
      // const d = await user.create({
      //     username: 'adsfsadf',
      //     password: 'adsfsadf',
      //     garden: 1,
      //     status: 2
      // })
      // const d = await user.Count({ _id: ['5f69950b90ce5e1f6c4a4bb4', '5f69c4fb1159e1156c118f85'] })
      // const d = await user.deleteById({_id: ['5f69c517cec6f626accd6c56', '5f69c4fb1159e1156c118f85']})
      //  console.log(d)

      //1.path
      // 指定要查询的表
      // 2.select(可选)
      // 指定要查询的字段
      // 3.model(可选)
      // 类型：Model，可选，指定关联字段的 model，如果没有指定就会使用Schema的ref。
      // 4.match(可选)
      // 类型：Object，可选，指定附加的查询条件。
      // 5.options(可选)
      // 类型：Object，可选，指定附加的其他查询选项，如排序以及条数限制等等。
      // const res = await test1.select({}).populate({
      //     path: 'userId',
      //     // -_id 去掉_id字段的返回
      //     select: 'username',
      //     model: user.models,
      //     //子元素的限制
      //     perDocumentLimit: 2

      // })

      // const res = await user.select({}).populate({
      //     path: 'test1',

      // })

      // const res = await user.select({})

      // console.log(res)

      // const ss = await user.create({
      //     username: 'adsfsadf',
      //     password: 'adsfsadf',
      //     garden: 1,
      //     status: 2
      // })

      // console.log(ss)

      //  console.log(data)
      // user.find({ username: '11' }, (err, data) => {
      //     console.log(data.length)
      // })

      // user.create()

      // const u = new user({
      //     username: '11',
      //     password: '43434'
      // })

      // u.save(async (err, u) => {
      //     if (err) { console.log(err) }
      //     await u.adds()

      // })

      // const s = await test1.create({
      //     userId: '5f69e49a331392288886398a',
      //     content: '12313123123'
      // })

      // test1.create({
      //     userId: '5f69e49a331392288886398a',
      //     content: '4'
      // })

      // test1.create({
      //     userId: '5f69e49a331392288886398a',
      //     content: '1'
      // })

      // test1.create({
      //     userId: '5f69e49a331392288886398a',
      //     content: '2'
      // })

      // test1.create({
      //     userId: '5f69e49a331392288886398a',
      //     content: '3'
      // })

      // test1.create({
      //     userId: '5f69e49a331392288886398a',
      //     content: '3'
      // })

      // test1.create({
      //     userId: '5f69e480a511d83aa84d48bb',
      //     content: '3'
      // })
      // test1.create({
      //     userId: '5f69e480a511d83aa84d48bb',
      //     content: '3'
      // })
      // test1.create({
      //     userId: '5f69e49a331392288886398a',
      //     content: '3'
      // })
      // test1.create({
      //     userId: '5f69e49a331392288886398a',
      //     content: '3'
      // })

      // console.log(s)
    }
  }
);

// 获取连接信息 并输出
// const db = mongoose.connection

// console.log(db)

let db = mongoose.connection;
db.on("disconnected", function () {
  console.log("断开连接");
});
export default mongoose;
