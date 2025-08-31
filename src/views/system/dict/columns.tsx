import type { DataTableColumns } from 'naive-ui'
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui'
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { renderProCopyableText } from 'pro-naive-ui'

interface DictDataColumnActions {
  onEdit: (row: Entity.DictData) => void
  onDelete: (id: number) => void
}

export const dictDataSearchColumns: ProSearchFormColumns<Entity.DictData> = [
  {
    title: '数据名称',
    path: 'name',
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

export function createDictDataColumns(actions: DictDataColumnActions): DataTableColumns<Entity.DictData> {
  return [

    {
      key: 'name',
      title: '数据名称',
      align: 'left',
      minWidth: 120,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      key: 'value',
      title: '数据键值',
      align: 'center',
      width: 120,
      render: row => renderProCopyableText(row.value),
    },
    {
      key: 'dictType',
      title: '字典类型',
      align: 'center',
      render: row => renderProCopyableText(row.dictType),
    },
    {
      key: 'sort',
      title: '排序',
      align: 'center',
      width: 100,
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      width: 100,
      render: (row: Entity.DictData) => (
        <NTag type={row.status === 0 ? 'success' : 'error'} bordered={false}>
          {row.status === 0 ? '正常' : '停用'}
        </NTag>
      ),
    },
    {
      key: 'remark',
      title: '备注',
      align: 'center',
    },
    {
      key: 'updateTime',
      title: '更新时间',
      align: 'center',
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      width: 150,
      render: (row: Entity.DictData) => (
        <NSpace justify="center">
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
              default: () => `确定删除字典数据"${row.name}"吗？`,
            }}
          />
        </NSpace>
      ),
    },
  ]
}
