import viteCompression from 'vite-plugin-compression'; //https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md

export default (env: ImportMetaEnv) => {
  // 默认使用gzip压缩
  const { VITE_COMPRESS_TYPE = 'gzip' } = env;
  return viteCompression({
    algorithm: VITE_COMPRESS_TYPE, // 压缩算法
  });
};
