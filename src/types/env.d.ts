interface ImportMetaEnv {
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string;
  /** 项目标题 */
  readonly VITE_APP_TITLE: string;
  /** 开启请求代理 */
  readonly VITE_HTTP_PROXY?: 'Y' | 'N';
  /** 是否开启打包压缩 */
  readonly VITE_COMPRESS?: 'Y' | 'N';
  /** 压缩算法类型 */
  readonly VITE_COMPRESS_TYPE?: 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw';
  /** hash路由模式 */
  readonly VITE_HASH_ROUTE?: 'Y' | 'N';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
