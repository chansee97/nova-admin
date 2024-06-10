import { Icon } from '@iconify/vue'
import { NIcon } from 'naive-ui'

export function renderIcon(icon?: string, props?: import('naive-ui').IconProps) {
  if (!icon)
    return

  return () => createIcon(icon, props)
}

export function createIcon(icon?: string, props?: import('naive-ui').IconProps) {
  if (!icon)
    return

  const isLocal = icon.startsWith('local:')
  let innerIcon: any
  if (isLocal) {
    const svgName = icon.replace('local:', '')
    const svg = import.meta.glob('@/assets/svg-icons/*.svg', {
      query: '?raw',
      import: 'default',
      eager: true,
    })
    const target = svg[`/src/assets/svg-icons/${svgName}.svg`]
    innerIcon = h(NIcon, { ...props, innerHTML: target })
  }
  else {
    innerIcon = h(NIcon, props, { default: () => h(Icon, { icon }) })
  }

  return innerIcon
}
