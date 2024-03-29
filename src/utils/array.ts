import { arrayToTree as _arrayToTree } from 'performant-array-to-tree'
import { omit } from 'radash'

export function arrayToTree(data: any) {
  const rowTree = _arrayToTree(data, {
    parentId: 'pid',
    dataField: null,
  })

  const transform = (node: any) => {
    if (node.children.length > 0) {
      return ({
        ...node,
        children: node.children.map(transform),
      })
    }
    return omit(node, ['children'])
  }
  return rowTree.map(transform)
}
