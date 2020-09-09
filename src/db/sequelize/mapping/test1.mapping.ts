import { Table, Column, ForeignKey, BelongsTo, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript'
import BaseTable from '../tables/base.table'
import Test from './test.mapping'


@Table({
    tableName: 'animal1'
})
export default class Test1 extends BaseTable<Test1> {

  @Column
  userId: number

  @Column
  age: number

  @Column
  garden: number

  // 传入foreignKey指定目标模型的外联key
  // sourceKey 自身的关联键  默认是id
  // @ts-ignore
  @BelongsTo(() => Test, { foreignKey: 'userId', targetKey: 'id' })
  test: Test;

}
