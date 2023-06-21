import vue from '@vitejs/plugin-vue'

import vueJsx from '@vitejs/plugin-vue-jsx'

// https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx
import VueDevTools from 'vite-plugin-vue-devtools' // https://github.com/webfansplz/vite-plugin-vue-devtools

const plugins = [vue({
  script: {
    defineModel: true,
  },
}), vueJsx(), VueDevTools()]

export default plugins
