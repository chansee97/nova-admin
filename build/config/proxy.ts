import type { ProxyOptions } from 'vite'

/**
 * @description: 生成vite代理字段
 * @param {*} envConfig - 环境变量配置
 */
export function createViteProxy(envConfig: ServiceEnvConfig) {
  const proxy: Record<string, string | ProxyOptions> = {
    [envConfig.urlPattern]: {
      target: envConfig.url,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${envConfig.urlPattern}`), ''),
    },
  }

  return proxy
}
