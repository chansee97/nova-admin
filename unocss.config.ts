import { defineConfig } from '@unocss/vite'; // https://github.com/unocss/unocss
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';

export default defineConfig({
  presets: [presetUno({ dark: 'class' }), presetAttributify()],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
  },
  theme: {
    colors: {
      primary: '#165DFFFF',
    },
  },
});
