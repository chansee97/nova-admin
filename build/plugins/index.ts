import vue from './vue';
import compress from './compress';

/**
 * @description: 设置vite插件配置
 * @param {*} viteEnv - 环境变量配置
 * @return {*}
 */
export function setVitePlugins(viteEnv) {
  const plugins = [...vue];

  if (viteEnv.VITE_COMPRESS_OPEN === 'Y') {
    plugins.push(compress(viteEnv));
  }

  return plugins;
}
