import type { ProxyOptions } from 'vite'
import { mapEntries } from 'radash'

export function generateProxyPattern(envConfig: Record<string, string>) {
  return mapEntries(envConfig, (key, value) => {
    return [
      key,
      {
        value,
        proxy: `/proxy-${key}`,
      },
    ]
  })
}

/**
 * @description: 生成vite代理字段
 * @param {*} envConfig - 环境变量配置
 */
export function createViteProxy(envConfig: Record<string, string>) {
  const proxyMap = generateProxyPattern(envConfig)
  return mapEntries(proxyMap, (key, value) => {
    return [
      value.proxy,
      {
        target: value.value,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(new RegExp(`^${value.proxy}`), ''),
      },
    ]
  }) as Record<string, string | ProxyOptions>
}
