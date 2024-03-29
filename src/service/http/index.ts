import { createAlovaInstance } from './alova'
import { serviceConfig } from '@/../service.config'
import { generateProxyPattern } from '@/../build/proxy'

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y' || false

const { url } = generateProxyPattern(serviceConfig[import.meta.env.MODE])

export const alovaInstance = createAlovaInstance({
  baseURL: isHttpProxy ? url.proxy : url.value,
})

export const blankInstance = createAlovaInstance({
  baseURL: '',
})
