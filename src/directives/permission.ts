import type { App, Directive } from 'vue'
import { useMenuPermission, usePermission, useRolePermission } from '@/hooks'

export function install(app: App) {
  const { hasPermission } = usePermission()
  const { hasMenuPermission } = useMenuPermission()
  const { hasRolePermission } = useRolePermission()

  function updatePermission(el: HTMLElement, permission: string | string[]) {
    if (!permission)
      throw new Error('v-permission Directive with no explicit permission attached')

    if (!hasPermission(permission))
      el.parentElement?.removeChild(el)
  }

  function updateMenuPermission(el: HTMLElement, permission: string | string[]) {
    if (!permission)
      throw new Error('v-menu Directive with no explicit menu permission attached')

    if (!hasMenuPermission(permission))
      el.parentElement?.removeChild(el)
  }

  function updateRolePermission(el: HTMLElement, role: string | string[]) {
    if (!role)
      throw new Error('v-role Directive with no explicit role attached')

    if (!hasRolePermission(role))
      el.parentElement?.removeChild(el)
  }

  // 通用权限指令（兼容旧版本）
  const permissionDirective: Directive<HTMLElement, string | string[]> = {
    mounted(el, binding) {
      updatePermission(el, binding.value)
    },
  }

  // 菜单权限指令
  const menuPermissionDirective: Directive<HTMLElement, string | string[]> = {
    mounted(el, binding) {
      updateMenuPermission(el, binding.value)
    },
  }

  // 角色权限指令
  const rolePermissionDirective: Directive<HTMLElement, string | string[]> = {
    mounted(el, binding) {
      updateRolePermission(el, binding.value)
    },
  }

  app.directive('permission', permissionDirective)
  app.directive('menu', menuPermissionDirective)
  app.directive('role', rolePermissionDirective)
}
