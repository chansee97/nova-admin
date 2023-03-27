import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import api from './module'

export function setupMockServer() {
  createProdMockServer(api)
}
