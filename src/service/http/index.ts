import { createAlovaInstance } from './alova'
import { proxyConfig } from '@/../build/proxy'

const { url, urlPattern } = proxyConfig[import.meta.env.MODE]

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y' || false

export const request = createAlovaInstance({
  baseURL: isHttpProxy ? urlPattern : url,
})

export const alovaInstance = createAlovaInstance({
  baseURL: 'https://mock.apifox.com/m1/4071143-0-default',
})

export const blankInstance = createAlovaInstance({
  baseURL: '',
})
