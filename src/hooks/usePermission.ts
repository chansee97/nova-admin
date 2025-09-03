import { useAuthStore } from '@/store'

/** 权限判断 */
export function usePermission() {
  const authStore = useAuthStore()

  function hasPermission(
    permissions?: string | string[],
  ) {
    if (!permissions)
      return true

    // 全部权限
    if (permissions === '*:*:*')
      return true

    const { permissions: userPermissions } = authStore

    // 确保 permissions 是数组
    const permissionArray = Array.isArray(permissions) ? permissions : [permissions]

    return permissionArray.some(i => userPermissions.includes(i))
  }

  return {
    hasPermission,
  }
}
