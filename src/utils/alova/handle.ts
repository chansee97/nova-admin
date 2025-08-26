import { fetchRefreshToken } from '@/api'
import { useAuthStore } from '@/store'
import { local } from '@/utils'

/**
 * @description: 处理接口token刷新
 * @return {*}
 */
export async function handleRefreshToken() {
  const authStore = useAuthStore()
  const isAutoRefresh = import.meta.env.VITE_AUTO_REFRESH_TOKEN === 'Y'
  if (!isAutoRefresh) {
    await authStore.logout()
    return
  }

  // 刷新token
  const { data } = await fetchRefreshToken({ refreshToken: local.get('refreshToken') })
  if (data) {
    local.set('accessToken', data.accessToken)
    local.set('refreshToken', data.refreshToken)
  }
  else {
    // 刷新失败，退出
    await authStore.logout()
  }
}
