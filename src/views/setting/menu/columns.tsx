import type { DataTableColumns } from 'naive-ui'
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui'
import { createIcon } from '@/utils'
import { renderProCopyableText } from 'pro-naive-ui'

// 菜单管理columns配置函数
interface MenuColumnActions {
  onEdit: (row: Entity.Menu) => void
  onDelete: (id: number) => void
  onAdd: (row: Entity.Menu) => void
}

export function createMenuColumns(actions: MenuColumnActions): DataTableColumns<Entity.Menu> {
  const { onEdit, onDelete, onAdd } = actions

  return [
    {
      title: '菜单名称',
      key: 'title',
      width: 400,
    },
    {
      title: '图标',
      align: 'center',
      key: 'icon',
      width: '6em',
      render: (row) => {
        return row.icon && createIcon(row.icon, { size: 20 })
      },
    },
    {
      title: '路径',
      key: 'path',
      render: row => renderProCopyableText(row.path),
    },
    {
      title: '权限标识',
      key: 'perms',
      width: '18em',
      align: 'center',
      render: row => renderProCopyableText(row.perms),
    },
    {
      title: '排序值',
      key: 'sort',
      align: 'center',
      width: '6em',
    },
    {
      title: '菜单类型',
      align: 'center',
      key: 'menuType',
      width: '8em',
      render: (row) => {
        const menuTypeMap = {
          directory: { label: '目录', type: 'primary' },
          page: { label: '菜单', type: 'warning' },
          permission: { label: '权限', type: 'info' },
        } as const
        const menuInfo = menuTypeMap[row.menuType]
        return <NTag type={menuInfo.type} bordered={false}>{menuInfo.label}</NTag>
      },
    },
    {
      title: '状态',
      align: 'center',
      key: 'status',
      width: '6em',
      render: (row) => {
        return (
          <NTag type={row.status === 0 ? 'success' : 'error'} bordered={false}>
            {row.status === 0 ? '正常' : '停用'}
          </NTag>
        )
      },
    },
    {
      title: '操作',
      align: 'center',
      key: 'actions',
      width: '16em',
      render: (row) => {
        return (
          <NSpace justify="center">
            {row.menuType !== 'permission' && (
              <NButton
                text
                type="primary"
                onClick={() => onAdd(row)}
              >
                新建
              </NButton>
            )}
            <NButton
              text
              onClick={() => onEdit(row)}
            >
              编辑
            </NButton>
            <NPopconfirm onPositiveClick={() => onDelete(row.id)}>
              {{
                default: () => '确认删除',
                trigger: () => <NButton text type="error">删除</NButton>,
              }}
            </NPopconfirm>
          </NSpace>
        )
      },
    },
  ]
}
