import { createAlovaInstance } from './alova'

export const request = createAlovaInstance({
  baseURL: __URL_MAP__.url.path,
})

export const blankInstance = createAlovaInstance({
  baseURL: '',
})
