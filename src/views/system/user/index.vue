<script setup lang="tsx">
import { createProSearchForm, useNDataTable } from 'pro-naive-ui'
import type { TreeOption } from 'naive-ui'
import { deleteUser, getDeptOptions, getUserList, updateUser } from '@/api'
import { createUserColumns, searchColumns } from './columns'
import UserModal from './components/UserModal.vue'

const modalRef = ref()
const treeData = ref<any[]>([])
const deptPattern = ref('')
const selectedDeptId = ref<number>()

const searchForm = createProSearchForm({
  initialValues: {
  },
  onReset() {
    selectedDeptId.value = undefined
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
} = useNDataTable(getUserPage, {
  form: searchForm,
})

async function delteteUser(id: number) {
  try {
    await deleteUser(id)
    window.$message.success('用户删除成功')
    refresh() // 重新加载列表
  }
  catch {
  }
}

async function updateUserStatus(id: number, value: 0 | 1) {
  try {
    await updateUser(id, { status: value })
    window.$message.success('用户状态更新成功')
    refresh() // 重新加载列表
  }
  catch {
  }
}

const tablecolumns = createUserColumns({
  onEdit: row => modalRef.value?.openModal('edit', row),
  onDelete: delteteUser,
  onStatusChange: updateUserStatus,
})

async function getUserPage({ current, pageSize }: any, formData: Entity.User[]) {
  try {
    const { data } = await getUserList({
      ...formData,
      deptId: selectedDeptId.value,
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

// 加载部门树数据
async function loadDeptTree() {
  try {
    const { data } = await getDeptOptions()
    treeData.value = data
  }
  catch (error) {
    console.error('加载部门数据失败:', error)
    treeData.value = []
  }
}

// 处理树节点点击
function handleTreeNodeClick(deptId: number) {
  selectedDeptId.value = deptId
  // 触发搜索
  refresh()
}

// 组件挂载时加载部门树
onMounted(() => {
  loadDeptTree()
})
</script>

<template>
  <n-flex>
    <n-card class="w-70">
      <template #header>
        <n-input v-model:value="deptPattern" placeholder="部门搜索">
          <template #prefix>
            <n-icon>
              <icon-park-outline-search />
            </n-icon>
          </template>
        </n-input>
      </template>
      <n-tree
        block-line
        show-line
        :data="treeData"
        key-field="value"
        :pattern="deptPattern"
        :node-props="({ option }: { option: TreeOption }) => {
          return {
            onClick: () => handleTreeNodeClick(option.value as number),
          }
        }"
      />
    </n-card>

    <n-space vertical class="flex-1">
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
            新增用户
          </n-button>
        </template>
      </pro-data-table>
    </n-space>
    <UserModal ref="modalRef" modal-name="用户" @success="refresh" />
  </n-flex>
</template>
