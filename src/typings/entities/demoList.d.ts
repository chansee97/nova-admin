/// <reference path="../global.d.ts"/>

/* 角色数据库表字段 */
namespace Entity {
  interface DemoList {
    id: number
    name: string
    age: number
    gender: '0' | '1' | null
    email: string
    address: string
    role: Entity.RoleType
    disabled: boolean
  }
}
