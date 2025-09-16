<script setup lang="tsx">
import { createProSearchForm, useNDataTable } from 'pro-naive-ui'
import {
  clearOperLog,
  deleteOperLog,
  getOperLogPage,
} from '@/api/monitor/oper-log'
import type { OperLogQueryParams } from '@/api/monitor/oper-log'
import { createTableColumns, searchColumns } from './columns'
import type { OperationLogSearchFormData } from './columns'

// 导入子组件
import DetailModal from './components/DetailModal.vue'

// 弹窗引用
const detailModalRef = ref()

// 创建搜索表单
const searchForm = createProSearchForm<OperationLogSearchFormData>({
  defaultCollapsed: true,
  initialValues: {
  },
})

// 使用useNDataTable
const {
  table: {
    tableProps,
  },
  search: {
    proSearchFormProps,
    searchLoading,
  },
  refresh,
} = useNDataTable(getList, {
  form: searchForm,
})

// 批量删除相关
const checkedRowKeys = ref<(number)[]>([])

/** 查询操作日志列表 */
interface Result {
  total: number
  list: Entity.OperLog[]
}
async function getList({ current, pageSize }: any, formData: OperationLogSearchFormData): Promise<Result> {
  try {
    const params: OperLogQueryParams = {
      pageNum: current,
      pageSize,
      ...formData,
    }

    return getOperLogPage(params).then(res => res.data)
  }
  catch (error) {
    console.error('获取操作日志列表失败:', error)
    return {
      total: 0,
      list: [],
    }
  }
}

/** 查看详情 */
function handleView(row: Entity.OperLog) {
  detailModalRef.value?.openModal(row)
}

/** 删除操作日志 */
async function handleDelete(operId: number | number[]) {
  const isBatch = Array.isArray(operId)
  const ids = isBatch ? operId.join(',') : operId.toString()

  window.$dialog.warning({
    title: '确认删除',
    content: isBatch
      ? `是否确认删除选中的 ${operId.length} 条操作日志？`
      : '是否确认删除该条操作日志？',
    positiveText: '确定删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await deleteOperLog(ids)
        window.$message.success('删除成功')
        if (isBatch) {
          // 清空选中项
          checkedRowKeys.value = []
        }
        refresh()
      }
      catch (error) {
        console.error('删除操作日志失败:', error)
      }
    },
  })
}

/** 清空操作日志 */
async function handleClean() {
  window.$dialog.warning({
    title: '确认清空',
    content: '是否确认清空所有操作日志数据？此操作不可恢复！',
    positiveText: '确定清空',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await clearOperLog()
        window.$message.success('清空成功')
        refresh()
      }
      catch (error) {
        console.error('清空操作日志失败:', error)
      }
    },
  })
}
// 创建表格列配置
const columns = createTableColumns({
  onView: handleView,
  onDelete: handleDelete,
})
</script>

<template>
  <n-space vertical>
    <n-card>
      <pro-search-form
        v-bind="proSearchFormProps"
        :form="searchForm"
        :columns="searchColumns"
      />
    </n-card>

    <!-- 数据表格 -->
    <pro-data-table
      v-bind="tableProps"
      v-model:checked-row-keys="checkedRowKeys"
      :columns="columns"
      row-key="id"
      :loading="searchLoading"
      title=" "
    >
      <template #toolbar>
        <n-flex>
          <n-button
            type="error"
            :disabled="checkedRowKeys.length === 0"
            @click="handleDelete(checkedRowKeys.map(id => Number(id)))"
          >
            <template #icon>
              <icon-park-outline-delete />
            </template>
            删除
          </n-button>
          <n-button type="warning" @click="handleClean">
            <template #icon>
              <icon-park-outline-clear />
            </template>
            清空
          </n-button>
        </n-flex>
      </template>
    </pro-data-table>

    <!-- 详情弹窗 -->
    <DetailModal ref="detailModalRef" />
  </n-space>
</template>
