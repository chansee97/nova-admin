<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { deleteMenu, getMenuList } from '@/api'
import type { SearchQuery } from '@/api'
import { createMenuColumns, searchColumns } from './columns'
import MenuModal from './components/MenuModal.vue'
import arrayToTree from 'array-to-tree'
import { createProSearchForm } from 'pro-naive-ui'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const menuModalRef = ref()

// 搜索表单
const searchForm = createProSearchForm<SearchQuery>({
  initialValues: {},
  onSubmit: getAllRoutes,
  onReset: getAllRoutes,
})

// 菜单管理columns配置
const columns = createMenuColumns({
  onEdit: row => menuModalRef.value.openModal('edit', row),
  onDelete: deleteData,
  onAdd: row => menuModalRef.value.openModal('add', row),
})

async function deleteData(id: number) {
  try {
    await deleteMenu(id)
    window.$message.success('删除菜单成功')
    searchForm.submit()
  }
  catch (error) {
    console.error('删除菜单失败', error)
  }
}

const tableData = ref<Entity.Menu[]>([])
async function getAllRoutes(params?: SearchQuery) {
  startLoading()
  try {
    const { data } = await getMenuList(params)

    tableData.value = arrayToTree(data, {
      parentProperty: 'parentId',
    })
  }
  catch {
    window.$message.error('获取菜单列表失败')
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
  <div>
    <!-- 搜索表单 -->
    <n-card class="mb-4">
      <pro-search-form
        :form="searchForm"
        :columns="searchColumns"
        :collapse-button-props="false"
      />
    </n-card>

    <pro-data-table
      row-key="id"
      :columns="columns"
      :data="tableData"
      :loading="loading"
    >
      <template #title>
        <n-button type="primary" @click="menuModalRef.openModal('add')">
          <template #icon>
            <icon-park-outline-plus />
          </template>
          新增
        </n-button>
      </template>
    </pro-data-table>

    <MenuModal ref="menuModalRef" modal-name="菜单" @success="searchForm.submit" />
  </div>
</template>
