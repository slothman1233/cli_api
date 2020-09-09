import { Table, Column, AllowNull, Default} from 'sequelize-typescript'
import BaseTable from './base.table'

@Table({
    tableName: 'derived_table'
})
export default class derived_table<T> extends BaseTable<T>{
    @AllowNull(false)
    @Default('ss')
    @Column
    name:string

    // @CreatedAt
    // createTime:Date

    // @UpdatedAt
    // updateTime:Date

    // @DeletedAt
    // deleteTime:Date
}
//CreatedAt, UpdatedAt, DeletedAt, 