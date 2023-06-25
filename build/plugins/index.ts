import type { PluginOption } from 'vite'
import UnoCSS from '@unocss/vite'
import vue from './vue'
import compress from './compress'
import visualizer from './visualizer'
import unplugin from './unplugin'
import mock from './mock'

// import { viteMockServe } from 'vite-plugin-mock' // https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md

/**
 * @description: 设置vite插件配置
 * @param {*} env - 环境变量配置
 * @return {*}
 */
export function setVitePlugins(env: ImportMetaEnv) {
  const plugins: PluginOption[] = [...vue, UnoCSS(), ...unplugin, mock]
  // 是否压缩
  if (env.VITE_COMPRESS_OPEN === 'Y')
    plugins.push(compress(env))

  // 是否依赖分析
  if (env.VITE_VISUALIZER === 'Y')
    plugins.push(visualizer as PluginOption)

  return plugins
}
