import type { ProxyOptions } from 'vite'

/** 不同请求服务的环境配置 */
export const proxyConfig: Record<ServiceEnvType, ServiceEnvConfig> = {
  dev: {
    url: 'https://mock.apifox.com/m1/4071143-0-default',
    urlPattern: '/url-pattern',
  },
  test: {
    url: 'http://localhost:8080',
    urlPattern: '/url-pattern',
  },
  prod: {
    url: 'https://mock.apifox.com/m1/4071143-0-default',
    urlPattern: '/url-pattern',
  },
}

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
