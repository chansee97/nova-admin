import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'; // https://github.com/unocss/unocss
export default defineConfig({
  presets: [presetUno({ dark: 'class' }), presetAttributify(), presetIcons()],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
  },
});
