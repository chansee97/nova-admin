import type { DataTableColumns } from 'naive-ui'
import { NButton, NSpace, NTag } from 'naive-ui'
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { renderProCopyableText } from 'pro-naive-ui'

// 登录日志搜索表单数据类型
export interface LoginLogSearchFormData {
  ipaddr?: string
  userName?: string
  status?: number
  loginTime?: string
}

// 登录日志搜索表单列配置
export const searchColumns: ProSearchFormColumns<LoginLogSearchFormData> = [
  {
    title: '登录地址',
    path: 'ipaddr',
    field: 'input',
    fieldProps: {
      clearable: true,
    },
  },
  {
    title: '用户名称',
    path: 'username',
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
        { label: '成功', value: '0' },
        { label: '失败', value: '1' },
      ],
    },
  },
  {
    title: '登录时间',
    path: 'loginTime',
    field: 'date-time-range',
    fieldProps: {
      clearable: true,
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      defaultTime: ['00:00:00', '23:59:59'],
    },
  },
]

// 表格列配置
export function createTableColumns(options: {
  onDelete: (infoId: number) => void
}): DataTableColumns<Entity.LoginLog> {
  const { onDelete } = options

  return [
    {
      type: 'selection',
    },
    {
      title: '用户名称',
      key: 'username',
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '登录地址',
      key: 'ipaddr',
      width: 130,
      align: 'center',
      render: row => renderProCopyableText(row.ipaddr),
    },
    {
      title: '登录地点',
      key: 'loginLocation',
      width: 150,
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '浏览器',
      key: 'browser',
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '操作系统',
      key: 'os',
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '登录状态',
      key: 'status',
      width: 80,
      align: 'center',
      render: (row) => {
        return (
          <NTag type={row.status === 0 ? 'success' : 'error'} bordered={false}>
            {row.status === 0 ? '成功' : '失败'}
          </NTag>
        )
      },
    },
    {
      title: '操作信息',
      key: 'msg',
      width: 200,
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '登录日期',
      key: 'loginTime',
      align: 'center',
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
