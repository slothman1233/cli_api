import { exportDao } from '../dbHelper'
import { PlainObject, MysqlResult } from '../../../common/type/type'

// const userDao = exportDao({
// 	sql: null,
// 	count: 'select count(*) as count from user where ?',
// 	getUser: 'select * from user where ?',
// 	insert: 'insert into user set ?',
// 	update: 'update user set ? where id = ?',
// 	delete: 'delete from user where ?'
// });

//dao全称是data access object，数据库访问对象，主要的功能就是用于进行数据操作的，在程序的标准开发架构中属于数据层的操作
export const sql = exportDao('')
export const count: (arg: PlainObject) => Promise<PlainObject[]> = exportDao('select count(*) as count from user where ?')
export const getUser: (arg: PlainObject) => Promise<PlainObject[]> = exportDao('select * from user where ?')
export const insert: (arg: PlainObject) => Promise<MysqlResult> = exportDao('insert into user set ?')
export const update: (arg: any[]) => Promise<MysqlResult> = exportDao('update user set ? where id = ?')
export const del: (arg: PlainObject) => Promise<MysqlResult> = exportDao('delete from user where ?')