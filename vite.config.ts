import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import { createViteProxy, setVitePlugins } from './build';
import { resolve } from 'path';
import { getServiceEnvConfig } from './src/config';

// 当前执行node命令时文件夹的地址（工作目录）
const rootPath: string = resolve(process.cwd());
const srcPath = `${rootPath}/src`;

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
	// 在开发环境下 command 的值为 serve 生产环境下为 build

	// 根据当前工作目录中的 `mode` 加载 .env 文件
	// 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
	const env = loadEnv(mode, process.cwd(), '') as unknown as ImportMetaEnv;
	const isOpenProxy = env.VITE_HTTP_PROXY === 'Y';

	const envConfig = getServiceEnvConfig(mode as ServiceEnvType);

	return {
		base: env.VITE_BASE_URL,
		plugins: setVitePlugins(env),
		resolve: {
			alias: {
				'~': rootPath,
				'@': srcPath,
			},
		},
		server: {
			host: '0.0.0.0',
			port: 3000,
			open: true,
			proxy: isOpenProxy ? createViteProxy(envConfig) : undefined,
		},
		preview: {
			port: 5211,
		},
		build: {
			reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
			sourcemap: false, // 构建后是否生成 source map 文件
		},
		optimizeDeps: {
			include: ['echarts', 'md-editor-v3', '@wangeditor/editor', '@wangeditor/editor-for-vue'],
		},
	};
});
