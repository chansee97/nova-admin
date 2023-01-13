import { local } from './storage';
import { EnumStorageKey } from '@/enum';

const DURATION = 6 * 60 * 60;

/* 获取当前token */
export function getToken() {
	return local.get(EnumStorageKey.token);
}
/* 设置token */
export function setToken(data: string) {
	local.set(EnumStorageKey.token, data, DURATION);
}
/* 移除token */
export function removeToken() {
	local.remove(EnumStorageKey.token);
}
/* 获取当前refreshToken */
export function getRefreshToken() {
	return local.get(EnumStorageKey.refreshToken);
}
/* 设置refreshToken */
export function setRefreshToken(data: string) {
	local.set(EnumStorageKey.refreshToken, data, DURATION);
}
/* 移除refreshToken */
export function removeRefreshToken() {
	local.remove(EnumStorageKey.refreshToken);
}

/* 获取用户详情 */
export function getUserInfo() {
	return local.get(EnumStorageKey.userInfo);
}
/* 设置用户详情 */
export function setUserInfo(data: any) {
	local.set(EnumStorageKey.userInfo, data);
}
/* 移除用户详情 */
export function removeUserInfo() {
	local.remove(EnumStorageKey.userInfo);
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
	removeToken();
	removeRefreshToken();
	removeUserInfo();
}
