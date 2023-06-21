import path from 'node:path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite' // https://github.com/antfu/unplugin-icons
import IconsResolver from 'unplugin-icons/resolver'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' // https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md

export default [
  AutoImport({
    imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    include: [
      /\.[tj]sx?$/,
      /\.vue$/,
      /\.vue\?vue/,
      /\.md$/],
    dts: 'src/typings/auto-imports.d.ts',
  }),
  Components({
    dts: 'src/typings/components.d.ts',
    resolvers: [IconsResolver(), NaiveUiResolver()],
  }),
  Icons({
    /* options */
    defaultStyle: 'display:inline-block',
    compiler: 'vue3',
  }),
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
    // inject: 'body-last',
    // customDomId: '__svg__icons__dom__',
  }),
]
