/// <reference path="../global.d.ts"/>

/* 数据库表字段 */
namespace Entity {
  interface Dept {
    /**
     * 祖级列表
     */
    ancestors?: string
    /**
     * 部门名称
     */
    deptName: string
    /**
     * 邮箱
     */
    email?: string
    /**
     * 负责人
     */
    leader?: string
    /**
     * 父部门ID
     */
    parentId?: number
    /**
     * 联系电话
     */
    phone?: string
    /**
     * 备注信息
     */
    remark?: string
    /**
     * 显示顺序
     */
    sort?: number
    /**
     * 部门状态
     */
    status?: number
    [property: string]: any
  }
}
