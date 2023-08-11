/** 不同请求服务的环境配置 */
export const proxyConfig: Record<ServiceEnvType, ServiceEnvConfig> = {
  dev: {
    url: 'https://mock.mengxuegu.com/mock/61e4df7c17249f68847fc191/api',
    urlPattern: '/url-pattern',
    secondUrl: 'http://localhost:3000',
    secondUrlPattern: '/second-url-pattern',
  },
  test: {
    url: 'http://localhost:8080',
    urlPattern: '/url-pattern',
    secondUrl: 'http://localhost:8081',
    secondUrlPattern: '/second-url-pattern',
  },
  prod: {
    url: 'http://localhost:8080',
    urlPattern: '/url-pattern',
    secondUrl: 'http://localhost:8081',
    secondUrlPattern: '/second-url-pattern',
  },
}
