import { Icon } from '@iconify/vue'
import { NIcon } from 'naive-ui'

export function renderIcon(icon: string, props?: import('naive-ui').IconProps) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) })
}
