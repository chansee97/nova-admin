import type { DataTableColumns } from 'naive-ui'
import { NButton, NSpace, NTag } from 'naive-ui'
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { renderProCopyableText } from 'pro-naive-ui'

// 操作日志搜索表单数据类型
export interface OperationLogSearchFormData {
  operUrl?: string
  title?: string
  operName?: string
  businessType?: number
  status?: 0 | 1
  operTime?: [string, string]
}

// 操作日志搜索表单列配置
export const searchColumns: ProSearchFormColumns<OperationLogSearchFormData> = [
  {
    title: '操作地址',
    path: 'operUrl',
    field: 'input',
    fieldProps: {
      clearable: true,
    },
  },
  {
    title: '系统模块',
    path: 'title',
    field: 'input',
    fieldProps: {
      clearable: true,
    },
  },
  {
    title: '操作人员',
    path: 'operName',
    field: 'input',
    fieldProps: {
      clearable: true,
    },
  },
  {
    title: '状态',
    path: 'status',
    field: 'select',
    fieldProps: {
      clearable: true,
      options: [
        { label: '正常', value: 0 },
        { label: '异常', value: 1 },
      ],
    },
  },
  {
    title: '操作时间',
    path: 'operTime',
    field: 'date-time-range',
    fieldProps: {
      clearable: true,
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      defaultTime: ['00:00:00', '23:59:59'],
    },
  },
]

// 表格列配置
export function createTableColumns(options: {
  onView: (row: Entity.OperLog) => void
  onDelete: (operId: number) => void
}): DataTableColumns<Entity.OperLog> {
  const { onView, onDelete } = options

  return [
    {
      type: 'selection',
      width: 55,
      align: 'center',
    },
    {
      title: '系统模块',
      key: 'title',
      width: 150,
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '操作人员',
      key: 'operName',
      width: 120,
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '主机地址',
      key: 'operIp',
      width: 130,
      align: 'center',
      render: row => renderProCopyableText(row.operIp),
    },
    {
      title: '操作地点',
      key: 'operLocation',
      width: 150,
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '操作状态',
      key: 'status',
      width: 100,
      align: 'center',
      render: (row) => {
        return (
          <NTag type={row.status === 0 ? 'success' : 'error'} bordered={false}>
            {row.status === 0 ? '正常' : '异常'}
          </NTag>
        )
      },
    },
    {
      title: '操作日期',
      key: 'operTime',
      width: 180,
      align: 'center',
    },
    {
      title: '消耗时间',
      key: 'costTime',
      width: 100,
      align: 'center',
      render: row => `${row.costTime}`,
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      align: 'center',
      fixed: 'right',
      render: (row) => {
        return (
          <NSpace justify="center">
            <NButton
              text
              type="primary"
              onClick={() => onView(row)}
            >
              详细
            </NButton>
            <NButton
              text
              type="error"
              onClick={() => onDelete(row.id)}
            >
              删除
            </NButton>
          </NSpace>
        )
      },
    },
  ]
}
