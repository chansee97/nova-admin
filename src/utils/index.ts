export * from './icon'
export * from './storage'

export function arrayToTree(arr) {
  const map = {}

  arr.forEach((item) => {
    map[item.id] = { ...item }
  })

  arr.forEach((item) => {
    if (item.pid !== 0) {
      const parent = map[item.pid]
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(map[item.id])
      }
    }
  })

  // 找出根节点
  const tree = Object.values(map).filter(item => item.pid === 0)

  return tree
}
