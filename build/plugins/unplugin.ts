import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite'; // https://github.com/antfu/unplugin-icons
import IconsResolver from 'unplugin-icons/resolver';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; // https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import path from 'path';

export default [
  Components({
    dts: 'src/types/components.d.ts',
    resolvers: [IconsResolver(), NaiveUiResolver()],
  }),
  Icons({
    /* options */
    defaultStyle: 'display:inline-block',
    compiler: 'vue3',
  }),
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
    inject: 'body-last',
    customDomId: '__svg__icons__dom__',
  }),
];
