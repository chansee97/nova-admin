<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import CopyText from '@/components/custom/CopyText.vue'
import { useBoolean } from '@/hooks'
import { fetchAllRoutes } from '@/service'
import { arrayToTree, createIcon } from '@/utils'
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui'
import TableModal from './components/TableModal.vue'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

function deleteData(id: number) {
  window.$message.success(`删除菜单id:${id}`)
}

const tableModalRef = ref()

const columns: DataTableColumns<AppRoute.RowRoute> = [
  {
    type: 'selection',
    width: 30,
  },
  {
    title: '名称',
    key: 'name',
    width: 200,
  },
  {
    title: '图标',
    align: 'center',
    key: 'icon',
    width: '6em',
    render: (row) => {
      return row.icon && createIcon(row.icon, { size: 20 })
    },
  },
  {
    title: '标题',
    align: 'center',
    key: 'title',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '路径',
    key: 'path',
    render: (row) => {
      return (
        <CopyText value={row.path} />
      )
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
    key: 'order',
    align: 'center',
    width: '6em',
  },
  {
    title: '菜单类型',
    align: 'center',
    key: 'menuType',
    width: '6em',
    render: (row) => {
      const menuType = row.menuType || 'page'
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
    width: '15em',
    render: (row) => {
      return (
        <NSpace justify="center">
          <NButton
            size="small"
            onClick={() => tableModalRef.value.openModal('view', row)}
          >
            查看
          </NButton>
          <NButton
            size="small"
            onClick={() => tableModalRef.value.openModal('edit', row)}
          >
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => deleteData(row.id)}>
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

const checkedRowKeys = ref<number[]>([])
async function handlePositiveClick() {
  window.$message.success(`批量删除id:${checkedRowKeys.value.join(',')}`)
}
</script>

<template>
  <n-card>
    <template #header>
      <NButton type="primary" @click="tableModalRef.openModal('add')">
        <template #icon>
          <icon-park-outline-add-one />
        </template>
        新建
      </NButton>
    </template>

    <template #header-extra>
      <n-flex>
        <NButton type="primary" secondary @click="getAllRoutes">
          <template #icon>
            <icon-park-outline-refresh />
          </template>
          刷新
        </NButton>
        <NPopconfirm
          @positive-click="handlePositiveClick"
        >
          <template #trigger>
            <NButton type="error" secondary>
              <template #icon>
                <icon-park-outline-delete-five />
              </template>
              批量删除
            </NButton>
          </template>
          确认删除所有选中菜单？
        </NPopconfirm>
      </n-flex>
    </template>
    <n-data-table
      v-model:checked-row-keys="checkedRowKeys"
      :row-key="(row:AppRoute.RowRoute) => row.id" :columns="columns" :data="tableData"
      :loading="loading"
      size="small"
      :scroll-x="1200"
    />
    <TableModal ref="tableModalRef" :all-routes="tableData" modal-name="菜单" />
  </n-card>
</template>
