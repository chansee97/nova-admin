import UnoCSS from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://github.com/antfu/unplugin-icons
import IconsResolver from 'unplugin-icons/resolver'

/**
 * @description: 设置vite插件配置
 * @param {*} env - 环境变量配置
 * @return {*}
 */
export function createVitePlugins(env: ImportMetaEnv) {
  const plugins = [
    // support vue
    vue(),
    vueJsx(),

    // support unocss
    UnoCSS(),

    // auto import api of lib
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
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
  ]
  // use compression
  if (env.VITE_BUILD_COMPRESS === 'Y') {
    const { VITE_COMPRESS_TYPE = 'gzip' } = env
    plugins.push(viteCompression({
      algorithm: VITE_COMPRESS_TYPE, // 压缩算法
    }))
  }

  return plugins
}
