import { local } from './storage';
import { storageKey } from '@/config';

const DURATION = 6 * 60 * 60;

/* 获取当前token */
export function getToken() {
	return local.get(storageKey.token);
}
/* 设置token */
export function setToken(data: string) {
	local.set(storageKey.token, data, DURATION);
}
/* 移除token */
export function removeToken() {
	local.remove(storageKey.token);
}
/* 获取当前refreshToken */
export function getRefreshToken() {
	return local.get(storageKey.refreshToken);
}
/* 设置refreshToken */
export function setRefreshToken(data: string) {
	local.set(storageKey.refreshToken, data, DURATION);
}
/* 移除refreshToken */
export function removeRefreshToken() {
	local.remove(storageKey.refreshToken);
}

/* 获取用户详情 */
export function getUserInfo() {
	return local.get(storageKey.userInfo);
}
/* 设置用户详情 */
export function setUserInfo(data: any) {
	local.set(storageKey.userInfo, data);
}
/* 移除用户详情 */
export function removeUserInfo() {
	local.remove(storageKey.userInfo);
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
	removeToken();
	removeRefreshToken();
	removeUserInfo();
}
