import { getServiceEnvConfig } from '@/config';
import { createRequest } from './request';

const { url, urlPattern } = getServiceEnvConfig(import.meta.env);

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

export const request = createRequest({ baseURL: isHttpProxy ? urlPattern : url });

// export const secondRequest = createRequest({ baseURL: isHttpProxy ? secondUrlPattern : secondUrl });
export const mockRequest = createRequest({ baseURL: '/mock' });
