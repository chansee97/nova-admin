import { useAuthStore } from '@/store'

/** 菜单权限判断 */
export function useMenuPermission() {
  const authStore = useAuthStore()

  function hasMenuPermission(
    permissions?: string | string[],
  ) {
    if (!permissions)
      return true

    // 确保 permissions 是数组
    const permissionArray = Array.isArray(permissions) ? permissions : [permissions]

    // 全部权限
    if (permissionArray.includes('admin'))
      return true

    const { permissions: userPermissions } = authStore

    return permissionArray.some(i => userPermissions.includes(i))
  }

  return {
    hasMenuPermission,
  }
}

/** 角色权限判断 */
export function useRolePermission() {
  const authStore = useAuthStore()

  function hasRolePermission(
    roles?: string | string[],
  ) {
    if (!roles)
      return true

    // 确保 roles 是数组
    const roleArray = Array.isArray(roles) ? roles : [roles]

    // 全部权限
    if (roleArray.includes('admin'))
      return true

    const { roles: userRoles } = authStore

    return roleArray.some(i => userRoles.includes(i))
  }

  return {
    hasRolePermission,
  }
}

/** 合并权限判断 */
export function usePermission() {
  const authStore = useAuthStore()

  function hasPermission(
    permissions?: string | string[],
  ) {
    if (!permissions)
      return true

    // 确保 permissions 是数组
    const permissionArray = Array.isArray(permissions) ? permissions : [permissions]

    // 全部权限
    if (permissionArray.includes('admin'))
      return true

    const { permissions: userPermissions, roles: userRoles } = authStore

    const hasPermission = permissionArray.some(i => userPermissions.includes(i))
    if (hasPermission)
      return true

    return permissionArray.some(i => userRoles.includes(i))
  }

  return {
    hasPermission,
  }
}
