/// <reference path="../global.d.ts"/>

/** 数据库表字段 */
namespace Entity {
  interface DictType {
    /**
     * 主键ID
     */
    id?: number
    /**
     * 字典名称
     */
    name: string
    /**
     * 字典类型
     */
    type: string
    /**
     * 备注信息
     */
    remark?: string
    /**
     * 状态
     */
    status?: number
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 更新时间
     */
    updateTime?: string
  }

  interface DictData {
    /**
     * 主键ID
     */
    id?: number
    /**
     * 字典名称
     */
    name: string
    /**
     * 字典排序
     */
    sort?: number
    /**
     * 字典类型
     */
    dictType: string
    /**
     * 字典键值
     */
    value: string
    /**
     * 备注信息
     */
    remark?: string
    /**
     * 状态
     */
    status: number
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 更新时间
     */
    updateTime?: string
  }
}
