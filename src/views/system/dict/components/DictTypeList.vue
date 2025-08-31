<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NPopconfirm, NSpace } from 'naive-ui'
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { createProSearchForm, useNDataTable } from 'pro-naive-ui'
import { deleteDictType, getDictTypeList } from '@/api'
import DictTypeModal from './DictTypeModal.vue'

defineEmits(['select'])

// 字典类型相关
const dictTypeModalRef = ref<InstanceType<typeof DictTypeModal>>()

// 搜索表单
const dictTypeSearchForm = createProSearchForm<Partial<Entity.DictType>>({
  initialValues: {},
})

// 搜索表单列配置
const dictTypeSearchColumns: ProSearchFormColumns<Entity.DictType> = [
  {
    title: '字典名称',
    path: 'name',
  },
]

// 使用 useNDataTable
const {
  table: {
    tableProps: dictTypeTableProps,
  },
  search: {
    proSearchFormProps: dictTypeSearchProps,
  },
  refresh: refreshDictTypes,
} = useNDataTable(getDictTypePage, {
  form: dictTypeSearchForm,
})

// 获取字典类型分页数据
async function getDictTypePage({ current, pageSize }: any, formData: Partial<Entity.DictType>) {
  try {
    const { data } = await getDictTypeList({
      ...formData,
      pageNum: current || 1,
      pageSize: pageSize || 10,
    })
    return data
  }
  catch {
    return {
      list: [],
      total: 0,
    }
  }
}

// 删除字典类型
async function deleteDictTypeData(id: number) {
  try {
    await deleteDictType(id)
    window.$message.success('字典类型删除成功')
    refreshDictTypes()
  }
  catch {
    window.$message.error('字典类型删除失败')
  }
}

// 表格列配置
const columns: DataTableColumns<Entity.DictType> = [
  {
    key: 'name',
    title: '字典名称',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    render: (row: Entity.DictType) => (
      <NSpace size="small" justify="center">
        <NButton
          text
          type="primary"
          onClick={(e: Event) => {
            e.stopPropagation()
            dictTypeModalRef.value?.openModal('edit', row)
          }}
        >
          编辑
        </NButton>
        <NPopconfirm
          onPositiveClick={() => deleteDictTypeData(row.id!)}
          v-slots={{
            trigger: () => (
              <NButton
                text
                type="error"
                onClick={(e: Event) => e.stopPropagation()}
              >
                删除
              </NButton>
            ),
            default: () => `确定删除字典类型"${row.name}"吗？`,
          }}
        />
      </NSpace>
    ),
  },
]
</script>

<template>
  <NSpace vertical>
    <!-- 搜索表单 -->
    <n-card>
      <pro-search-form
        :form="dictTypeSearchForm"
        :columns="dictTypeSearchColumns"
        :collapse-button-props="false"
        v-bind="dictTypeSearchProps"
        :cols="2"
      />
    </n-card>

    <!-- 数据表格 -->
    <pro-data-table
      :columns="columns"
      v-bind="dictTypeTableProps"
      :row-props="(row:Entity.DictType) => {
        return {
          onClick: () => $emit('select', row),
          style: {
            cursor: 'pointer',
          },
        }
      }"
    >
      <template #title>
        <NButton
          type="primary"
          @click="dictTypeModalRef?.openModal('add')"
        >
          <template #icon>
            <icon-park-outline-plus />
          </template>
          新增字典类型
        </NButton>
      </template>
    </pro-data-table>

    <!-- 字典类型弹窗 -->
    <DictTypeModal
      ref="dictTypeModalRef"
      modal-name="字典类型"
      @success="refreshDictTypes"
    />
  </NSpace>
</template>
