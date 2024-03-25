import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './build/plugins'
import { createViteProxy, proxyConfig } from './build/proxy'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 在开发环境下 command 的值为 serve 生产环境下为 build

  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, __dirname, '') as ImportMetaEnv
  const envConfig = proxyConfig[mode as ServiceEnvType]

  return {
    base: env.VITE_BASE_URL,
    plugins: createVitePlugins(env),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
      proxy:
        env.VITE_HTTP_PROXY === 'Y' ? createViteProxy(envConfig) : undefined,
    },
    build: {
      target: 'esnext',
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
    },
    optimizeDeps: {
      include: ['echarts', 'md-editor-v3', '@tinymce/tinymce-vue'],
    },
  }
})
