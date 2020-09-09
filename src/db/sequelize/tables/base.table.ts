/**
 * @description base 
 * @author 文亮
 */

import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript'
import { CreateOptions, UpdateOptions, NonNullFindOptions } from 'sequelize/types'


@Table({
    tableName: 'base_table',
    timestamps: true
})
export default class BaseTable<T> extends Model<T>{

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    /**
     * 添加
     * @param {Object} item 新项目
     * @return {T} object 添加的对象
     */
    static async createItem<T extends Model>(item: T, options?: CreateOptions<T['_attributes']>): Promise<T>{
        const res:T = await this.create(item, options) as T
        return res
    }

    /**
     * 删除
     * @param {number} id 
     * @return {Boolean}
     */
    static async deleteById(id: number):Promise<Boolean> {
        const res = await this.destroy({
            where: { id: id }
        })

        return res > 0
    }

    /**
     * 更新
     * @param {Object} item 新项目对象
     * @param {number} id 需要修改的id
     * @return {boolean}
     */
    static async updateItemById<T extends Model>(item: T, id: number): Promise<boolean> {
        //拼接对象
        let updateData = item
        // 拼接查询条件
        let where = { id }
        // 执行修改

        const res = await this.updateItem(updateData, {
            where
        })

        // 修改的行数
        return res

    }

    /**
     * 更新
     * @param {Object} item 新项目对象
     * @param {Object} options 
     * @return {boolean} 
     */
    static async updateItem<T extends Model>(item: T, options: UpdateOptions): Promise<boolean> {
        // 执行修改
        const res = await this.update(item, options)

        return res[0] > 0

    }

    /**
     * 查询所有
     */
    static async getList<T extends Model>(): Promise<T[]>{
        let items = await this.findAll({ raw: true })
        return items as T[]
    }

    /**
     * 查询（通过id）
     * @param id 
     */
    static async getById<T extends Model>(id: number) : Promise<T> {
        let item = await this.findOne({
            raw: true,
            where: { id: id }
        })

        return item as T
    }

 
    
}
