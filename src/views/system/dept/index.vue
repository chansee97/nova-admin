<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { deleteDept, getDeptList } from '@/api'
import type { MenuSearchQuery } from '@/api'
import { createDeptColumns, deptSearchColumns } from './columns'
import DeptModal from './components/DeptModal.vue'
import arrayToTree from 'array-to-tree'
import { createProSearchForm } from 'pro-naive-ui'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const deptModalRef = ref<InstanceType<typeof DeptModal>>()

// 搜索表单
const searchForm = createProSearchForm<MenuSearchQuery>({
  initialValues: {},
  onSubmit: getAllDepts,
  onReset: getAllDepts,
})

// 删除部门
async function deleteDeptItem(id: number) {
  try {
    await deleteDept(id)
    window.$message.success('部门删除成功')
    searchForm.submit()
  }
  catch {
    window.$message.error('部门删除失败')
  }
}

// 部门表格列配置
const deptColumns = createDeptColumns({
  onAdd: (row: Entity.Dept) => deptModalRef.value?.openModal('add', row),
  onEdit: (row: Entity.Dept) => deptModalRef.value?.openModal('edit', row),
  onDelete: deleteDeptItem,
})

const tableData = ref<Entity.Dept[]>([])

// 获取所有部门数据并构建树形结构
async function getAllDepts(params?: MenuSearchQuery) {
  startLoading()
  try {
    const { data } = await getDeptList(params)

    tableData.value = arrayToTree(data, {
      parentProperty: 'parentId',
    })
  }
  catch {
    window.$message.error('获取部门列表失败')
  }
  finally {
    endLoading()
  }
}

onMounted(() => {
  searchForm.submit()
})
</script>

<template>
  <div class="h-full">
    <!-- 搜索表单 -->
    <n-card class="mb-4">
      <pro-search-form
        :form="searchForm"
        :columns="deptSearchColumns"
        :collapse-button-props="false"
      />
    </n-card>

    <!-- 数据表格 -->
    <pro-data-table
      row-key="id"
      :columns="deptColumns"
      :data="tableData"
      :loading="loading"
    >
      <template #title>
        <n-button
          type="primary"
          @click="deptModalRef?.openModal('add')"
        >
          <template #icon>
            <icon-park-outline-plus />
          </template>
          新增部门
        </n-button>
      </template>
    </pro-data-table>

    <!-- 部门弹窗 -->
    <DeptModal
      ref="deptModalRef"
      modal-name="部门"
      @success="searchForm.submit"
    />
  </div>
</template>
