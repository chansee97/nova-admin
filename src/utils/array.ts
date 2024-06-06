// import { arrayToTree as _arrayToTree } from 'performant-array-to-tree'
// import { omit } from 'radash'

// export function arrayToTree(data: any) {
//   const rowTree = _arrayToTree(data, {
//     parentId: 'pid',
//     dataField: null,
//   })

//   const transform = (node: any) => {
//     if (node.children.length > 0) {
//       return ({
//         ...node,
//         children: node.children.map(transform),
//       })
//     }
//     return omit(node, ['children'])
//   }
//   return rowTree.map(transform)
// }

// interface ArrayItem extends Record<PropertyKey, any> {
//   id: number
//   pid: number | null
// }

// interface TreeItem extends ArrayItem {
//   children?: TreeItem[]
// }

export function arrayToTree(arr: any[]) {
  const res: any = []
  const map = new Map()
  arr.forEach((item) => {
    map.set(item.id, item)
  })
  arr.forEach((item) => {
    const parent = item.pid && map.get(item.pid)
    if (parent) {
      if (parent?.children)
        parent.children.push(item)
      else
        parent.children = [item]
    }
    else {
      res.push(item)
    }
  })
  return res
}
