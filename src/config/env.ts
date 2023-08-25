/** 不同请求服务的环境配置 */
export const proxyConfig: Record<ServiceEnvType, ServiceEnvConfig> = {
  dev: {
    url: 'http://localhost:3000',
    urlPattern: '/url-pattern',
  },
  test: {
    url: 'http://localhost:8080',
    urlPattern: '/url-pattern',
  },
  prod: {
    url: 'http://localhost:8080',
    urlPattern: '/url-pattern',
  },
}
