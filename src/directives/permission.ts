import type { App, Directive } from 'vue'
import { usePermission } from '@/hooks'

export function install(app: App) {
  const { hasPermission } = usePermission()

  function updatapermission(el: HTMLElement, permission: string | string[]) {
    if (!permission)
      throw new Error('v-permissson Directive with no explicit role attached')

    if (!hasPermission(permission))
      el.parentElement?.removeChild(el)
  }

  const permissionDirective: Directive<HTMLElement, string | string[]> = {
    mounted(el, binding) {
      updatapermission(el, binding.value)
    },
  }
  app.directive('permission', permissionDirective)
}
