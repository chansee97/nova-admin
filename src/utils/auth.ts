import { setLocal, getLocal, removeLocal } from './storage';
import { EnumStorageKey } from '@/enum';

/* 获取当前token */
export function getToken() {
  return getLocal(EnumStorageKey.token);
}
/* 设置token */
export function setToken(data: string) {
  setLocal(EnumStorageKey.token, data);
}
/* 移除token */
export function removeToken() {
  removeLocal(EnumStorageKey.token);
}

/* 获取用户详情 */
export function getUserInfo() {
  return getLocal(EnumStorageKey.userInfo);
}
/* 设置用户详情 */
export function setUserInfo(data: any) {
  setLocal(EnumStorageKey.userInfo, data);
}
/* 移除用户详情 */
export function removeUserInfo() {
  removeLocal(EnumStorageKey.userInfo);
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
  removeToken();
  removeUserInfo();
}
