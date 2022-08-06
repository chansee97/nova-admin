import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default [
  Components({
    dts: 'src/types/components.d.ts',
    resolvers: [NaiveUiResolver()],
  }),
];
