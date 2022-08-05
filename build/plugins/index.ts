import vue from './vue';
import compress from './compress';
import html from './html';

/**
 * @description: 设置vite插件配置
 * @param {*} env - 环境变量配置
 * @return {*}
 */
export function setVitePlugins(env) {
  const plugins = [...vue, html(env)];

  if (env.VITE_COMPRESS_OPEN === 'Y') {
    plugins.push(compress(env));
  }

  return plugins;
}
