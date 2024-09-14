import { generateProxyPattern } from '@/../build/proxy'
import { serviceConfig } from '@/../service.config'
import { createAlovaInstance } from './alova'

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y'

const { url } = generateProxyPattern(serviceConfig[import.meta.env.MODE])

export const request = createAlovaInstance({
  baseURL: isHttpProxy ? url.proxy : url.value,
})

export const blankInstance = createAlovaInstance({
  baseURL: '',
})
