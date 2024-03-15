import { createRequest } from './request'
import { createAlovaInstance } from './alova'
import { proxyConfig } from '@/config'

const { url, urlPattern } = proxyConfig[import.meta.env.MODE]

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y' || false

export const request = createRequest({
  baseURL: isHttpProxy ? urlPattern : url,
}, {
  msgKey: 'message',
})

// export const secondRequest = createRequest({ baseURL: isHttpProxy ? secondUrlPattern : secondUrl });
export const mockRequest = createRequest({ baseURL: 'https://mock.apifox.com/m1/4071143-0-default' }, {
  msgKey: 'message',
})

export const alovaInstance = createAlovaInstance({
  baseURL: 'https://mock.apifox.com/m1/4071143-0-default',
})
