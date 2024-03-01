import path from 'node:path'
import UnoCSS from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import Icons from 'unplugin-icons/vite'

// https://github.com/antfu/unplugin-icons
import IconsResolver from 'unplugin-icons/resolver'

// https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

/**
 * @description: 设置vite插件配置
 * @param {*} env - 环境变量配置
 * @return {*}
 */
export function setVitePlugins(env: ImportMetaEnv) {
  const plugins = [
    // support vue
    vue(),
    vueJsx(),

    // support unocss
    UnoCSS(),

    // auto import api of lib
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
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
      resolvers: [IconsResolver(), NaiveUiResolver()],
    }),

    // auto import iconify's icons
    Icons({
      defaultStyle: 'display:inline-block',
      compiler: 'vue3',
    }),

    // auto use svg icon
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      // inject: 'body-last',
      // customDomId: '__svg__icons__dom__',
    }),
  ]

  // use compression
  if (env.VITE_COMPRESS_OPEN === 'Y') {
    const { VITE_COMPRESS_TYPE = 'gzip' } = env
    plugins.push(viteCompression({
      algorithm: VITE_COMPRESS_TYPE, // 压缩算法
    }))
  }

  return plugins
}
