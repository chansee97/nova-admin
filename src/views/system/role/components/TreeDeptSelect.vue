<script setup lang="ts">
import { getDeptOptions } from '@/api'

const deptOptions = ref<any[]>([])

const checkedKeys = defineModel<number[]>('value', { default: () => [] })
const expandedKeys = ref<number[]>([])
const cascade = ref(true)
const isExpanded = ref(false)
const isAllSelected = ref(false)

// 获取所有节点keys的辅助函数
function getAllKeys(nodes: any[]): number[] {
  let keys: number[] = []
  nodes.forEach((node) => {
    keys.push(node.value)
    if (node.children && node.children.length > 0) {
      keys = keys.concat(getAllKeys(node.children))
    }
  })
  return keys
}

// checkbox更新回调函数
function handleExpandedChange(expanded: boolean) {
  if (expanded) {
    expandedKeys.value = getAllKeys(deptOptions.value)
  }
  else {
    expandedKeys.value = []
  }
}

function handleAllSelectedChange(selected: boolean) {
  if (selected) {
    checkedKeys.value = getAllKeys(deptOptions.value)
  }
  else {
    checkedKeys.value = []
  }
}

// 加载部门数据
async function loadDeptOptions() {
  try {
    const { data } = await getDeptOptions()
    deptOptions.value = data
  }
  catch (error) {
    console.error('加载部门数据失败:', error)
    deptOptions.value = []
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadDeptOptions()
})
</script>

<template>
  <div class="w-full">
    <div class="mb-2 flex gap-4 justify-end">
      <n-checkbox v-model:checked="isExpanded" @update:checked="handleExpandedChange">
        展开全部
      </n-checkbox>
      <n-checkbox v-model:checked="isAllSelected" @update:checked="handleAllSelectedChange">
        全选
      </n-checkbox>
      <n-checkbox v-model:checked="cascade">
        父子联动
      </n-checkbox>
    </div>
    <n-scrollbar class="border border-gray-200 rounded p-2" style="max-height: 240px">
      <n-tree
        v-model:checked-keys="checkedKeys"
        v-model:expanded-keys="expandedKeys"
        block-line
        show-line
        checkable
        :cascade="cascade"
        :data="deptOptions"
        key-field="value"
      />
    </n-scrollbar>
  </div>
</template>
