/** 不同请求服务的环境配置 */
const serviceEnv = {
  dev: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
  test: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
  prod: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
};

/**
 * @description: 生成vite代理字段
 * @param {*} viteEnv - 环境变量配置
 */
export function createViteProxy(viteEnv) {
  //判断是否需要开启代理
  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'Y';
  if (!isOpenProxy) return undefined;

  // 返回对应代理
  const { VITE_SERVICE_ENV = 'dev' } = viteEnv;
  return serviceEnv[VITE_SERVICE_ENV];
}
