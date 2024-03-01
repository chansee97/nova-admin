import type { App } from 'vue'
import { setupPermission } from './permission'
import { setupCopy } from './copy'

export function installDirectives(app: App) {
  setupPermission(app)
  setupCopy(app)
}
