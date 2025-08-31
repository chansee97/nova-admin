import type { DataTableColumns } from 'naive-ui'
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui'
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { renderProCopyableText, renderProDateText } from 'pro-naive-ui'

interface DeptColumnActions {
  onEdit: (row: Entity.Dept) => void
  onDelete: (id: number) => void
  onAdd: (row: Entity.Dept) => void
}

export const deptSearchColumns: ProSearchFormColumns<Entity.Dept> = [
  {
    title: '部门名称',
    path: 'deptName',
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

export function createDeptColumns(actions: DeptColumnActions): DataTableColumns<Entity.Dept> {
  return [
    {
      key: 'deptName',
      title: '部门名称',
      align: 'left',
      minWidth: 150,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      key: 'sort',
      title: '排序',
      align: 'center',
      width: 80,
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      width: 100,
      render: (row: Entity.Dept) => (
        <NTag type={row.status === 0 ? 'success' : 'error'} size="small">
          {row.status === 0 ? '正常' : '停用'}
        </NTag>
      ),
    },
    {
      key: 'leader',
      title: '负责人',
      align: 'center',
      width: 120,
      render: (row: Entity.Dept) => row.leader || '-',
    },
    {
      key: 'phone',
      title: '联系电话',
      align: 'center',
      render: (row: Entity.Dept) => row.phone ? renderProCopyableText(row.phone) : '-',
    },
    {
      key: 'email',
      title: '邮箱',
      align: 'center',
      render: (row: Entity.Dept) => row.email ? renderProCopyableText(row.email) : '-',
    },
    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      width: 180,
      render: (row: Entity.Dept) => {
        return row.createTime ? renderProDateText(row.createTime) : '-'
      },
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      width: 200,
      render: (row: Entity.Dept) => (
        <NSpace justify="center">
          <NButton
            type="info"
            text
            onClick={() => actions.onAdd(row)}
          >
            新增
          </NButton>
          <NButton
            type="primary"
            text
            onClick={() => actions.onEdit(row)}
          >
            编辑
          </NButton>
          <NPopconfirm
            onPositiveClick={() => actions.onDelete(row.id!)}
            v-slots={{
              trigger: () => (
                <NButton type="error" text>
                  删除
                </NButton>
              ),
              default: () => `确定删除部门"${row.deptName}"吗？`,
            }}
          />
        </NSpace>
      ),
    },
  ]
}
