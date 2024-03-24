import { createAlovaInstance } from './alova'
import { proxyConfig } from '@/../build/proxy'

const { url, urlPattern } = proxyConfig[import.meta.env.MODE]

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y' || false

export const alovaInstance = createAlovaInstance({
  baseURL: isHttpProxy ? urlPattern : url,
})

export const blankInstance = createAlovaInstance({
  baseURL: '',
})
