import { createRequest } from './request'
import { proxyConfig } from '@/config'

const { url, urlPattern, secondUrl, secondUrlPattern }
  = proxyConfig[import.meta.env.MODE]

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y' || false

export const request = createRequest({
  baseURL: isHttpProxy ? urlPattern : url,
})

export const devRequest = createRequest({
  baseURL: isHttpProxy ? secondUrlPattern : secondUrl,
}, {
  msgKey: 'message',
})

// export const secondRequest = createRequest({ baseURL: isHttpProxy ? secondUrlPattern : secondUrl });
export const mockRequest = createRequest({ baseURL: '/mock' })
