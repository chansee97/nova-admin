import type { DataTableColumns } from 'naive-ui'
import { NButton, NPopconfirm, NSpace, NSwitch, NTag } from 'naive-ui'
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { renderProCopyableText, renderProDateText } from 'pro-naive-ui'

export const searchColumns: ProSearchFormColumns<Entity.User> = [
  {
    title: '用户名',
    path: 'username',
  },
  {
    title: '手机号',
    path: 'phone',
  },
  {
    title: '状态',
    path: 'status',
    field: 'select',
    fieldProps: {
      options: [
        {
          label: '启用',
          value: 0,
        },
        {
          label: '禁用',
          value: 1,
        },
      ],
    },
  },

]

// 用户管理columns配置函数
interface UserColumnActions {
  onEdit: (row: Entity.User) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, value: 0 | 1) => void
}

export function createUserColumns(actions: UserColumnActions): DataTableColumns<Entity.User> {
  return [
    {
      title: '用户名',
      align: 'center',
      key: 'username',
    },
    {
      title: '昵称',
      align: 'center',
      key: 'nickName',
    },
    {
      title: '性别',
      align: 'center',
      key: 'gender',
      render: (row) => {
        const genderMap = {
          male: '男',
          female: '女',
          unknown: '未知',
        }
        return (
          <NTag size="small">
            {genderMap[row.gender || 'unknown']}
          </NTag>
        )
      },
    },
    {
      title: '邮箱',
      align: 'center',
      key: 'email',
      render: row => renderProCopyableText(row.email),
    },
    {
      title: '手机号',
      align: 'center',
      key: 'phone',
      render: row => renderProCopyableText(row.phone),
    },
    {
      title: '状态',
      align: 'center',
      key: 'status',
      width: 100,
      render: (row) => {
        return (
          <NSwitch
            value={row.status}
            checked-value={0}
            unchecked-value={1}
            onUpdateValue={(value: 0 | 1) => actions.onStatusChange(row.id, value)}
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
      width: 120,
      render: (row) => {
        return (
          <NSpace justify="center">
            <NButton
              text
              onClick={() => actions.onEdit(row)}
            >
              编辑
            </NButton>
            <NPopconfirm onPositiveClick={() => actions.onDelete(row.id)}>
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
