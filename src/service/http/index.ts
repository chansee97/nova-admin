import { createAlovaInstance } from './alova'

export const request = createAlovaInstance({
  baseURL: __PROXY_MAPPING__.url.path,
})

export const blankInstance = createAlovaInstance({
  baseURL: '',
})
