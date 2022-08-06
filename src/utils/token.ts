import { setLocal, getLocal, removeLocal } from './storage';
const TOKEN_CODE = 'access_token';
const DURATION = 6 * 60 * 60;

export function getToken() {
  return getLocal(TOKEN_CODE);
}

export function setToken(token: any) {
  setLocal(TOKEN_CODE, token, DURATION);
}

export function removeToken() {
  removeLocal(TOKEN_CODE);
}
