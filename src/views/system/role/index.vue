<script setup lang="tsx">
import { createProSearchForm, useNDataTable } from 'pro-naive-ui'
import { deleteRole, getRoleList, updateRole } from '@/api'
import { createRoleColumns, searchColumns } from './columns'
import RoleModal from './components/RoleModal.vue'

const searchForm = createProSearchForm({
  initialValues: {
  },
})

const {
  table: {
    tableProps,
  },
  search: {
    proSearchFormProps,
  },
  refresh,
} = useNDataTable(getRolePage, {
  form: searchForm,
})

const modalRef = ref()

async function deleteRoleData(id: number) {
  try {
    await deleteRole(id)
    window.$message.success('角色删除成功')
    refresh() // 重新加载列表
  }
  catch {
    window.$message.error('角色删除失败')
  }
}

async function updateRoleStatus(id: number, value: 0 | 1) {
  try {
    await updateRole(id, { status: value })
    window.$message.success('角色状态更新成功')
    refresh() // 重新加载列表
  }
  catch {
    window.$message.error('角色状态更新失败')
  }
}

const tablecolumns = createRoleColumns({
  onEdit: (row: Entity.Role) => modalRef.value?.openModal('edit', row),
  onDelete: deleteRoleData,
  onStatusChange: updateRoleStatus,
})

async function getRolePage({ current, pageSize }: any, formData: Entity.Role[]) {
  try {
    const { data } = await getRoleList({
      ...formData,
      pageNum: current,
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
  <n-space vertical>
    <n-card>
      <pro-search-form
        :form="searchForm"
        :columns="searchColumns"
        v-bind="proSearchFormProps"
        :collapse-button-props="false"
      />
    </n-card>

    <pro-data-table
      :columns="tablecolumns"
      v-bind="tableProps"
    >
      <template #title>
        <n-button type="primary" @click="modalRef.openModal('add')">
          <template #icon>
            <icon-park-outline-plus />
          </template>
          新增角色
        </n-button>
      </template>
    </pro-data-table>
    <RoleModal ref="modalRef" modal-name="角色" @success="refresh" />
  </n-space>
</template>
