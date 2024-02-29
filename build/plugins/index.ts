import type { PluginOption } from 'vite'
import UnoCSS from '@unocss/vite'
import vue from './vue'
import compress from './compress'
import unplugin from './unplugin'

/**
 * @description: 设置vite插件配置
 * @param {*} env - 环境变量配置
 * @return {*}
 */
export function setVitePlugins(env: ImportMetaEnv) {
  const plugins: PluginOption[] = [...vue, UnoCSS(), ...unplugin]
  // 是否压缩
  if (env.VITE_COMPRESS_OPEN === 'Y')
    plugins.push(compress(env))

  return plugins
}
