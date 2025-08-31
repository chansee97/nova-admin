<script setup lang="ts">
import { createProSearchForm, useNDataTable } from 'pro-naive-ui'
import { deleteDictData, getDictDataList } from '@/api'
import { createDictDataColumns, dictDataSearchColumns } from './columns'
import DictTypeList from './components/DictTypeList.vue'
import DictDataModal from './components/DictDataModal.vue'

const dictTypeListRef = ref<InstanceType<typeof DictTypeList>>()

// 字典数据相关
const dictDataSearchForm = createProSearchForm<Partial<Entity.DictData>>({
  initialValues: {},
})

const {
  table: {
    tableProps: dictDataTableProps,
  },
  search: {
    proSearchFormProps: dictDataSearchProps,
  },
  refresh: refreshDictData,
} = useNDataTable(getDictDataPage, {
  form: dictDataSearchForm,
})

const dictDataModalRef = ref<InstanceType<typeof DictDataModal>>()

// 选择字典类型
const currentDictType = ref<Entity.DictType | null>(null)
function handleDictTypeSelect(dictType: Entity.DictType) {
  currentDictType.value = dictType
  refreshDictData()
}

// 删除字典数据
async function deleteDictDataItem(id: number) {
  try {
    await deleteDictData(id)
    window.$message.success('字典数据删除成功')
    refreshDictData()
  }
  catch {
    window.$message.error('字典数据删除失败')
  }
}

// 字典数据表格列配置
const dictDataColumns = createDictDataColumns({
  onEdit: (row: Entity.DictData) => dictDataModalRef.value?.openModal('edit', row),
  onDelete: deleteDictDataItem,
})

// 获取字典数据分页
async function getDictDataPage({ current, pageSize }: any, formData: Partial<Entity.DictData>) {
  if (!currentDictType.value) {
    return { list: [], total: 0 }
  }

  try {
    const { data } = await getDictDataList({
      ...formData,
      dictType: currentDictType.value.type,
      pageNum: current || 1,
      pageSize,
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
</script>

<template>
  <div class="flex h-full gap-2">
    <!-- 左侧字典类型列表 -->
    <div class="w-1/5">
      <DictTypeList
        ref="dictTypeListRef"
        @select="handleDictTypeSelect"
      />
    </div>

    <!-- 右侧字典数据表格 -->
    <n-space class="flex-1" vertical>
      <n-card>
        <pro-search-form
          :form="dictDataSearchForm"
          :columns="dictDataSearchColumns"
          v-bind="dictDataSearchProps"
          :collapse-button-props="false"
        />
      </n-card>

      <pro-data-table
        :columns="dictDataColumns"
        v-bind="dictDataTableProps"
      >
        <template #title>
          <n-button
            v-if="currentDictType?.type"
            type="primary"
            @click="dictDataModalRef?.openModal('add', { dictType: currentDictType.type })"
          >
            <template #icon>
              <icon-park-outline-plus />
            </template>
            新增字典数据
          </n-button>
        </template>
      </pro-data-table>
    </n-space>
    <!-- 字典数据弹窗 -->
    <DictDataModal
      ref="dictDataModalRef"
      @success="refreshDictData"
    />
  </div>
</template>
