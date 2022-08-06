import vue from './vue';
import compress from './compress';
import html from './html';
import unocss from './unocss';
import visualizer from './visualizer';
import unplugin from './unplugin';

/**
 * @description: 设置vite插件配置
 * @param {*} env - 环境变量配置
 * @return {*}
 */
export function setVitePlugins(env) {
  const plugins = [...vue, html(env), unocss, ...unplugin];
  // 是否压缩
  if (env.VITE_COMPRESS_OPEN === 'Y') {
    plugins.push(compress(env));
  }
  // 是否依赖分析
  if (env.VITE_VISUALIZER === 'Y') {
    plugins.push(visualizer);
  }
  return plugins;
}
