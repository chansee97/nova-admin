import { createHtmlPlugin } from 'vite-plugin-html'; // https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md

export default (env) => {
  return createHtmlPlugin({
    minify: true, // 压缩HTML
    inject: {
      // 注入数据
      data: {
        title: env.VITE_APP_TITLE,
      },
    },
  });
};
