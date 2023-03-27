import type { App } from 'vue'
import { setupPermission } from './permission'

export function setupDirectives(app: App) {
  setupPermission(app)
}
