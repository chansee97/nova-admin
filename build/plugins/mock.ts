import { viteMockServe } from 'vite-plugin-mock' // https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md

export default viteMockServe({
  mockPath: 'mock',
  // enable: true,
  // watchFiles: false,
})
