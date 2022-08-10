import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default [
  Components({
    dts: 'src/types/components.d.ts',
    resolvers: [IconsResolver(), NaiveUiResolver()],
  }),
  Icons({
    /* options */
  }),
];
