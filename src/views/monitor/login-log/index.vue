<script setup lang="tsx">
import { createProSearchForm, useNDataTable } from 'pro-naive-ui'
import {
  clearLoginLog,
  deleteLoginLog,
  getLoginLogPage,
} from '@/api/monitor/login-log'
import type { LoginLogSearchQuery } from '@/api/monitor/login-log'
import { createTableColumns, searchColumns } from './columns'
import type { LoginLogSearchFormData } from './columns'

// 创建搜索表单
const searchForm = createProSearchForm<LoginLogSearchFormData>({
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
const checkedRowKeys = ref<number[]>([])

/** 查询登录日志列表 */
async function getList({ current, pageSize }: any, formData: LoginLogSearchFormData) {
  try {
    const params: LoginLogSearchQuery = {
      pageNum: current,
      pageSize,
      ...formData,
    }

    return getLoginLogPage(params).then(res => res.data)
  }
  catch (error) {
    console.error('获取登录日志列表失败:', error)
    return {
      total: 0,
      list: [],
    }
  }
}

/** 删除登录日志 */
async function handleDelete(infoId: number | number[]) {
  const isBatch = Array.isArray(infoId)
  const ids = isBatch ? infoId.join(',') : infoId.toString()
  const count = isBatch ? infoId.length : 1

  window.$dialog.warning({
    title: '确认删除',
    content: isBatch
      ? `是否确认删除选中的 ${count} 条登录日志？`
      : '是否确认删除该条登录日志？',
    positiveText: '确定删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await deleteLoginLog(ids)
        window.$message.success('删除成功')
        if (isBatch) {
          // 清空选中项
          checkedRowKeys.value = []
        }
        refresh()
      }
      catch (error) {
        console.error('删除登录日志失败:', error)
      }
    },
  })
}

/** 清空登录日志 */
async function handleClean() {
  window.$dialog.warning({
    title: '确认清空',
    content: '是否确认清空所有登录日志数据？此操作不可恢复！',
    positiveText: '确定清空',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await clearLoginLog()
        window.$message.success('清空成功')
        refresh()
      }
      catch (error) {
        console.error('清空登录日志失败:', error)
      }
    },
  })
}

// 创建表格列配置
const columns = createTableColumns({
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
          <n-button type="error" :disabled="checkedRowKeys.length === 0" @click="handleDelete(checkedRowKeys)">
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
  </n-space>
</template>
