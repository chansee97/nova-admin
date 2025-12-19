import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import UnoCSS from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { ProNaiveUIResolver } from 'pro-naive-ui-resolver'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoProxy from 'vite-plugin-auto-proxy'
import { serviceConfig } from './service.config'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  const env = loadEnv(mode, __dirname, '') as ImportMetaEnv

  const plugins = [
    // support vue
    vue(),
    vueJsx(),
    VueDevTools(),

    // support unocss
    UnoCSS(),

    // auto import api of lib
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        'vue-i18n',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
            'useModal',
          ],
        },
      ],
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/,
      ],
      dts: 'src/typings/auto-imports.d.ts',
    }),

    // auto import components lib
    Components({
      dts: 'src/typings/components.d.ts',
      resolvers: [
        IconsResolver({
          prefix: false,
          customCollections: [
            'svg-icons',
          ],
        }),
        NaiveUiResolver(),
        ProNaiveUIResolver(),
      ],
    }),

    // auto import iconify's icons
    Icons({
      defaultStyle: 'display:inline-block',
      compiler: 'vue3',
      customCollections: {
        'svg-icons': FileSystemIconLoader(
          'src/assets/svg-icons',
          svg => svg.replace(/^<svg /, '<svg fill="currentColor" width="1.2em" height="1.2em"'),
        ),
      },
    }),

    AutoProxy({
      enableProxy: env.VITE_HTTP_PROXY === 'Y',
      serviceConfig,
      dts: 'src/typings/auto-proxy.d.ts',
    }),
  ]

  // use compression
  if (env.VITE_BUILD_COMPRESS === 'Y') {
    const { VITE_COMPRESS_TYPE = 'gzip' } = env
    plugins.push(viteCompression({
      algorithm: VITE_COMPRESS_TYPE, // 压缩算法
    }))
  }

  return {
    base: env.VITE_BASE_URL,
    plugins,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
    },
    build: {
      target: 'esnext',
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
    },
    optimizeDeps: {
      include: ['echarts', 'md-editor-v3', 'quill'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  }
})
