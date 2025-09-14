import type { DataTableColumns } from 'naive-ui'
import { NButton, NPopconfirm, NSpace, NSwitch } from 'naive-ui'
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { renderProCopyableText, renderProTags } from 'pro-naive-ui'

export const searchColumns: ProSearchFormColumns<Entity.Role> = [
  {
    title: '角色名称',
    path: 'roleName',
  },
  {
    title: '角色标识',
    path: 'roleKey',
  },
  {
    title: '状态',
    path: 'status',
    field: 'select',
    fieldProps: {
      options: [
        { label: '正常', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
  },
]

// 角色管理columns配置函数
interface RoleColumnActions {
  onEdit: (row: Entity.Role) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, value: 0 | 1) => void
}

export function createRoleColumns(actions: RoleColumnActions): DataTableColumns<Entity.Role> {
  return [
    {
      title: '角色名称',
      align: 'center',
      key: 'roleName',
    },
    {
      title: '角色标识',
      align: 'center',
      key: 'roleKey',
      render: row => renderProCopyableText(row.roleKey),
    },
    {
      title: '数据范围',
      align: 'center',
      key: 'dataScope',
      render: (row) => {
        const dataScopeMap: Record<number, string> = {
          1: '全部数据权限',
          2: '自定数据权限',
          3: '本部门数据权限',
          4: '本部门及以下数据权限',
          5: '仅本人数据权限',
        }
        return renderProTags(dataScopeMap[row.dataScope])
      },
    },
    {
      title: '备注',
      align: 'center',
      key: 'remark',
    },
    {
      title: '状态',
      align: 'center',
      key: 'status',
      width: 100,
      render: (row) => {
        return (
          row.roleKey !== 'admin' && (
            <NSwitch
              value={row.status}
              checked-value={0}
              unchecked-value={1}
              onUpdateValue={(value: 0 | 1) => actions.onStatusChange(row.id, value)}
            >
              {{ checked: () => '启用', unchecked: () => '禁用' }}
            </NSwitch>
          )
        )
      },
    },
    {
      title: '创建时间',
      align: 'center',
      key: 'createTime',
      width: 200,
    },
    {
      title: '操作',
      align: 'center',
      key: 'actions',
      width: 200,
      render: (row) => {
        return (
          row.roleKey !== 'admin' && (
            <NSpace justify="center">
              <NButton
                text
                type="primary"
                onClick={() => actions.onEdit(row)}
              >
                编辑
              </NButton>
              <NPopconfirm
                onPositiveClick={() => actions.onDelete(row.id)}
              >
                {{
                  default: () => '确认删除该角色？',
                  trigger: () => (
                    <NButton text type="error">
                      删除
                    </NButton>
                  ),
                }}
              </NPopconfirm>
            </NSpace>
          )
        )
      },
    },
  ]
}
