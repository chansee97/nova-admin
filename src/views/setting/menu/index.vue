<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui'
import TableModal from './components/TableModal.vue'
import { fetchAllRoutes } from '@/service'
import { useLoading } from '@/hooks'
import { arrayToTree, renderIcon } from '@/utils'

const { loading, startLoading, endLoading } = useLoading(false)

function deleteData(id: number) {
  window.$message.success(`删除菜单id:${id}`)
}

const tableModalRef = ref()

const columns: DataTableColumns<AppRoute.RowRoute> = [
  {
    title: '名称',
    key: 'name',
    width: 200,
  },
  {
    title: '图标',
    align: 'center',
    key: 'meta.icon',
    width: '6em',
    render: (row) => {
      return row['meta.icon'] && renderIcon(row['meta.icon'], { size: 20 })()
    },
  },
  {
    title: '标题',
    align: 'center',
    key: 'meta.title',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '路径',
    key: 'path',
    ellipsis: {
      tooltip: true,
    },

  },
  {
    title: '组件路径',
    key: 'componentPath',
    ellipsis: {
      tooltip: true,
    },
    render: (row) => {
      return row.componentPath || '-'
    },
  },
  {
    title: '排序值',
    key: 'meta.order',
    align: 'center',
    width: '6em',
  },
  {
    title: '菜单类型',
    align: 'center',
    key: 'meta.menuType',
    width: '6em',
    render: (row) => {
      const menuType = row['meta.menuType'] || 'page'
      const menuTagType: Record<AppRoute.MenuType, NaiveUI.ThemeColor> = {
        dir: 'primary',
        page: 'warning',
      }
      return <NTag type={menuTagType[menuType]}>{menuType}</NTag>
    },
  },
  {
    title: '操作',
    align: 'center',
    key: 'actions',
    render: (row) => {
      const rowData = row as unknown as CommonList.UserList
      return (
        <NSpace justify="center">
          <NButton
            size="small"
            onClick={() => tableModalRef.value.openModal('view', rowData)}
          >
            查看
          </NButton>
          <NButton
            size="small"
            onClick={() => tableModalRef.value.openModal('edit', rowData)}
          >
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => deleteData(rowData.id)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size="small" type="error">删除</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  },
]

const tableData = ref<AppRoute.RowRoute[]>([])

onMounted(() => {
  getAllRoutes()
})
async function getAllRoutes() {
  startLoading()
  const { data } = await fetchAllRoutes()
  tableData.value = arrayToTree(data)
  endLoading()
}
</script>

<template>
  <n-card>
    <n-flex vertical>
      <div class="flex gap-4">
        <NButton type="primary" @click="tableModalRef.openModal('add')">
          <template #icon>
            <icon-park-outline-add-one />
          </template>
          新建
        </NButton>
      </div>
      <n-data-table
        :row-key="(row:AppRoute.RowRoute) => row.id" :columns="columns" :data="tableData"
        :loading="loading"
      />
      <TableModal ref="tableModalRef" :all-routes="tableData" modal-name="菜单" />
    </n-flex>
  </n-card>
</template>
