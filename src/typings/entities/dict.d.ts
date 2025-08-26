/// <reference path="../global.d.ts"/>

/** 数据库表字段 */
namespace Entity {
  interface DictType {
    /**
     * 字典名称
     */
    dictName: string
    /**
     * 字典类型
     */
    dictType: string
    /**
     * 备注信息
     */
    remark?: string
    /**
     * 状态
     */
    status?: number
  }

  interface DictData {
    /**
     * 样式属性
     */
    cssClass?: string
    /**
     * 字典标签
     */
    dictLabel: string
    /**
     * 字典排序
     */
    dictSort?: number
    /**
     * 字典类型
     */
    dictType: string
    /**
     * 字典键值
     */
    dictValue: string
    /**
     * 是否默认
     */
    isDefault?: number
    /**
     * 表格回显样式
     */
    listClass?: string
    /**
     * 备注信息
     */
    remark?: string
    /**
     * 状态
     */
    status?: number
  }
}
