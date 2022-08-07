import { viteMockServe } from 'vite-plugin-mock';

export default viteMockServe({
  mockPath: 'mock',
  watchFiles: true, // 监视文件更改
  // localEnabled: command === 'serve',
});
