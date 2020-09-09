import { Table, Column, AllowNull, Default, BelongsTo, PrimaryKey, AutoIncrement, HasMany, ForeignKey, BelongsToMany } from 'sequelize-typescript'
import derived_table from '../tables/derived.table'
import Test1 from './test1.mapping'
import { NonNullFindOptions } from 'sequelize/types'

//@BelongsTo / @HasOne / @hasMany / @BelongsToMany

//链表查询
//需要定义asscoiation 才能使用include关联。一个asscoiation包含
//belongsTo 一个关系加一个
//HasMany (一对多), 
//belongsToMany（多对多）, 
//hasOne (一对一)
@Table({
    tableName: 'animal'
})
export default class Test extends derived_table<Test> {

    // @Default(1)
    // @AllowNull(false)
    @Column
    weight: number

    // 传入foreignKey指定目标模型的外联key
    // sourceKey 自身的关联键  默认是id
    // @ts-ignore
    @HasMany(() => Test1, { foreignKey: 'userId', sourceKey: 'id' })
    test1: Test1[]
}

