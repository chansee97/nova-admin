<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { deleteMenu, getMenuList } from '@/service'
import { createMenuColumns } from './columns'
import MenuModal from './components/MenuModal.vue'
import arrayToTree from 'array-to-tree'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

async function deleteData(id: number) {
  try {
    await deleteMenu(id)
    window.$message.success('删除菜单成功')
    getAllRoutes() // 重新加载列表
  }
  catch (error) {
    console.error('删除菜单失败', error)
  }
}

const menuModalRef = ref()

// 菜单管理columns配置
const columns = createMenuColumns({
  onEdit: row => menuModalRef.value.openModal('edit', row),
  onDelete: deleteData,
  onAdd: row => menuModalRef.value.openModal('add', row),
})

const tableData = ref<Entity.Menu[]>([])

// 递归排序菜单树结构
function sortMenuTree(menus: Entity.Menu[]): Entity.Menu[] {
  // 对当前级别的菜单按sort值排序（升序）
  const sortedMenus = menus.sort((a, b) => {
    const sortA = a.sort || 0
    const sortB = b.sort || 0
    return sortA - sortB
  })

  // 递归排序子菜单
  return sortedMenus.map(menu => ({
    ...menu,
    children: menu.children ? sortMenuTree(menu.children) : undefined,
  }))
}

async function getAllRoutes() {
  startLoading()
  try {
    const { data } = await getMenuList()
    const treeData = arrayToTree(data, {
      parentProperty: 'parentId',
      customID: 'menuId',
    })

    // 对树形结构按sort值排序
    tableData.value = sortMenuTree(treeData)
  }
  catch {
    window.$message.error('获取菜单列表失败')
  }
  finally {
    endLoading()
  }
}

onMounted(() => {
  getAllRoutes()
})
</script>

<template>
  <div>
    <pro-data-table
      row-key="menuId"
      :columns="columns"
      :data="tableData"
      :loading="loading"
    >
      <template #title>
        <n-button type="primary" @click="menuModalRef.openModal('add')">
          <template #icon>
            <icon-park-outline-add-one />
          </template>
          新建
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" secondary @click="getAllRoutes">
          <template #icon>
            <icon-park-outline-refresh />
          </template>
          刷新
        </n-button>
      </template>
    </pro-data-table>

    <MenuModal ref="menuModalRef" modal-name="菜单" @success="getAllRoutes" />
  </div>
</template>
