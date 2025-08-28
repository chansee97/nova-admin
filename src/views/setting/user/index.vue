<script setup lang="tsx">
import { createProSearchForm, useNDataTable } from 'pro-naive-ui'
import { deleteUser, getUserList } from '@/api'
import { createUserColumns, searchColumns } from './columns'
import UserModal from './components/UserModal.vue'

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
} = useNDataTable(getUserPage, {
  form: searchForm,
})

const modalRef = ref()

async function delteteUser(id: number) {
  try {
    await deleteUser(id)
    window.$message.success('用户删除成功')
    refresh() // 重新加载列表
  }
  catch {
  }
}

const tablecolumns = createUserColumns({
  onEdit: row => modalRef.value?.openModal('edit', row),
  onDelete: delteteUser,
  onStatusChange: () => {},
})

async function getUserPage({ current, pageSize }: any, formData: Entity.User[]) {
  try {
    const { data } = await getUserList({
      ...formData,
      pageNum: current,
      pageSize,
    })
    return {
      list: data.list,
      total: data.total,
    }
  }
  catch {
    return {
      list: [],
      total: 0,
    }
  }
}

const treeData = ref([
  {
    id: '1',
    label: '安徽总公司',
    children: [
      {
        id: '2',
        label: '合肥分公司',
        children: [
          {
            id: '4',
            label: '财务部门',
          },
          {
            id: '5',
            label: '采购部门',
          },
        ],
      },
      {
        id: '3',
        label: '芜湖分公司',
      },
    ],
  },
])
</script>

<template>
  <n-flex>
    <n-card class="w-70">
      <n-tree
        block-line
        :data="treeData"
        key-field="id"
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
            新建用户
          </n-button>
        </template>
      </pro-data-table>
    </n-space>
    <UserModal ref="modalRef" modal-name="用户" @success="refresh" />
  </n-flex>
</template>
