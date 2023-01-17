/** 本地存储信息字段 */
export const storageKey = {
	/* 用户信息 */
	userInfo: '__USER_INFO__',
	/* token */
	token: '__TOKEN__',
	/* refreshToken */
	refreshToken: '__REFRESH_TOKEN__',
	/* 标签栏信息 */
	tabsRoutes: '__TABS_ROUTES__',
};

/** 本地存储前缀 */
export const STORAGE_PREFIX = '';

/** 本地存储加密密钥 */
export const STORAGE_ENCRYPT_SECRET = '__CryptoJS_Secret__';

/** 本地存储缓存时长 */
export const STORAGE_DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
