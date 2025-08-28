import type { DataTableColumns } from 'naive-ui'
import { NButton, NPopconfirm, NSpace, NSwitch } from 'naive-ui'
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { renderProCopyableText, renderProDateText } from 'pro-naive-ui'

export const searchColumns: ProSearchFormColumns<Entity.Role> = [
  {
    title: '角色名称',
    path: 'roleName',
  },
  {
    title: '角色权限',
    path: 'roleKey',
  },
  {
    title: '状态',
    path: 'roleStatus',
    field: 'select',
    fieldProps: {
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  },
]

// 角色管理columns配置函数
interface RoleColumnActions {
  onEdit: (row: Entity.Role) => void
  onDelete: (id: number) => void
  onStatusChange: (value: 0 | 1, id: number) => void
}

export function createRoleColumns(actions: RoleColumnActions): DataTableColumns<Entity.Role> {
  return [
    {
      title: '角色ID',
      align: 'center',
      key: 'roleId',
      width: 80,
    },
    {
      title: '角色名称',
      align: 'center',
      key: 'roleName',
    },
    {
      title: '角色权限',
      align: 'center',
      key: 'roleKey',
      render: row => renderProCopyableText(row.roleKey),
    },
    {
      title: '备注',
      align: 'center',
      key: 'remark',
      width: 200,
    },
    {
      title: '排序',
      align: 'center',
      key: 'sort',
      width: 80,
    },
    {
      title: '状态',
      align: 'center',
      key: 'roleStatus',
      width: 100,
      render: (row) => {
        return (
          <NSwitch
            value={row.roleStatus || 1}
            checked-value={1}
            unchecked-value={0}
            onUpdateValue={(value: 0 | 1) =>
              actions.onStatusChange(value, row.roleId)}
          >
            {{ checked: () => '启用', unchecked: () => '禁用' }}
          </NSwitch>
        )
      },
    },
    {
      title: '创建时间',
      align: 'center',
      key: 'createTime',
      width: 200,
      render: row => renderProDateText(row.createTime, {
        pattern: 'datetime',
      }),
    },
    {
      title: '操作',
      align: 'center',
      key: 'actions',
      width: 200,
      render: (row) => {
        return (
          <NSpace justify="center">
            <NButton
              size="small"
              type="primary"
              onClick={() => actions.onEdit(row)}
            >
              编辑
            </NButton>
            <NPopconfirm
              onPositiveClick={() => actions.onDelete(row.roleId)}
            >
              {{
                default: () => '确认删除该角色？',
                trigger: () => (
                  <NButton size="small" type="error">
                    删除
                  </NButton>
                ),
              }}
            </NPopconfirm>
          </NSpace>
        )
      },
    },
  ]
}
