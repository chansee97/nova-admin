import { defineConfig, presetAttributify, presetWind3, transformerVariantGroup } from 'unocss'

// https://github.com/unocss/unocss

export default defineConfig({
  presets: [presetWind3({ dark: 'class' }), presetAttributify()],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
  },
  transformers: [
    transformerVariantGroup(),
  ],
})
