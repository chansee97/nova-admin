import type { DataTableColumns } from 'naive-ui'
import { NButton, NFlex, NPopconfirm } from 'naive-ui'
import CopyText from '@/components/custom/CopyText.vue'

// 字典类型columns配置函数
interface DictTypeColumnActions {
  onView: (code: string) => void
  onEdit: (row: Entity.DictType) => void
  onDelete: (id: number) => void
}

export function createDictTypeColumns(actions: DictTypeColumnActions): DataTableColumns<Entity.DictType> {
  return [
    {
      title: '字典项',
      key: 'dictName',
    },
    {
      title: '字典码',
      key: 'dictType',
      render: (row) => {
        return (
          <CopyText value={row.dictType} />
        )
      },
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render: (row) => {
        return (
          <span>{row.status === 1 ? '正常' : '停用'}</span>
        )
      },
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render: (row) => {
        return (
          <NFlex justify="center">
            <NButton
              size="small"
              onClick={() => actions.onView(row.dictType)}
            >
              查看字典
            </NButton>
            <NButton
              size="small"
              onClick={() => actions.onEdit(row)}
            >
              编辑
            </NButton>
            <NPopconfirm onPositiveClick={() => actions.onDelete(row.id!)}>
              {{
                default: () => (
                  <span>
                    确认删除字典类型
                    <b>{row.dictName}</b>
                    {' '}
                    ？
                  </span>
                ),
                trigger: () => <NButton size="small" type="error">删除</NButton>,
              }}
            </NPopconfirm>
          </NFlex>
        )
      },
    },
  ]
}

// 字典数据columns配置函数
interface DictDataColumnActions {
  onEdit: (row: Entity.DictData) => void
  onDelete: (id: number) => void
}

export function createDictDataColumns(actions: DictDataColumnActions): DataTableColumns<Entity.DictData> {
  return [
    {
      title: '字典名称',
      key: 'dictLabel',
    },
    {
      title: '字典码',
      key: 'dictType',
    },
    {
      title: '字典值',
      key: 'dictValue',
    },
    {
      title: '排序',
      key: 'dictSort',
      align: 'center',
      width: '80px',
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render: (row) => {
        return (
          <span>{row.status === 1 ? '正常' : '停用'}</span>
        )
      },
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      width: '15em',
      render: (row) => {
        return (
          <NFlex justify="center">
            <NButton
              size="small"
              onClick={() => actions.onEdit(row)}
            >
              编辑
            </NButton>
            <NPopconfirm onPositiveClick={() => actions.onDelete(row.id!)}>
              {{
                default: () => (
                  <span>
                    确认删除字典数据
                    <b>{row.dictLabel}</b>
                    {' '}
                    ？
                  </span>
                ),
                trigger: () => <NButton size="small" type="error">删除</NButton>,
              }}
            </NPopconfirm>
          </NFlex>
        )
      },
    },
  ]
}
