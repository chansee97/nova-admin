<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createMenu, getMenuById, selectMenuTree, updateMenu } from '@/api'
import { createProModalForm } from 'pro-naive-ui'
import DirectoryForm from './DirectoryForm.vue'
import PageForm from './PageForm.vue'
import PermissionForm from './PermissionForm.vue'

interface Props {
  modalName?: string
}

const {
  modalName: _modalName = '',
} = defineProps<Props>()

const emit = defineEmits<{
  success: []
}>()

const { bool: submitLoading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const modalForm = createProModalForm<Partial<Entity.Menu>>({
  omitEmptyString: false,
  initialValues: {
    menuType: 'directory',
    menuVisible: true,
    tabVisible: true,
    status: 0,
  },
  onSubmit: submitModal,
})

type ModalType = 'add' | 'edit'
const modalType = shallowRef<ModalType>('add')
const modalTitle = computed(() => {
  const titleMap: Record<ModalType, string> = {
    add: '添加',
    edit: '编辑',
  }
  const menuTypeMap = {
    directory: '目录',
    page: '页面',
    permission: '权限',
  }
  const currentMenuType = modalForm.values.value?.menuType || 'directory'
  return `${titleMap[modalType.value]}${menuTypeMap[currentMenuType]}`
})

const treeData = ref<Entity.TreeNode[]>([])

// 动态组件映射
const formComponents = {
  directory: DirectoryForm,
  page: PageForm,
  permission: PermissionForm,
}

// 当前使用的表单组件
const currentFormComponent = computed(() => {
  const menuType = modalForm.values.value?.menuType || 'directory'
  return formComponents[menuType as keyof typeof formComponents]
})

async function openModal(type: ModalType = 'add', data?: Partial<Entity.Menu>) {
  selectMenuTree().then((res) => {
    treeData.value = res.data
  })

  modalType.value = type
  modalForm.open()
  const handlers = {
    async add() {
      // 如果新建传入了menuId，设置为父级菜单
      if (data?.id) {
        modalForm.values.value.parentId = data.id
      }
    },
    async edit() {
      if (!data?.id)
        return
      const response = await getMenuById(data.id)
      modalForm.values.value = response.data
    },
  }
  await handlers[type]()
}

async function submitModal(filedValues: Partial<Entity.Menu>) {
  const handlers = {
    async add() {
      try {
        await createMenu(filedValues)
        window.$message.success('菜单创建成功')
      }
      catch (error) {
        console.error('创建菜单失败', error)
      }
    },
    async edit() {
      try {
        await updateMenu(modalForm.values.value.id!, filedValues)
        window.$message.success('菜单更新成功')
      }
      catch (error) {
        console.error('更新菜单失败', error)
      }
    },
  }

  startLoading()
  await handlers[modalType.value]()
  emit('success')
  modalForm.close()
  endLoading()
}

defineExpose({
  openModal,
})
</script>

<template>
  <pro-modal-form
    :title="modalTitle"
    :form="modalForm"
    :loading="submitLoading"
    width="700px"
  >
    <pro-field
      path="menuType"
    >
      <template #input="{ inputProps }">
        <n-tabs
          type="segment" animated :value="inputProps.value"
          @update:value="inputProps.onUpdateValue"
        >
          <n-tab name="directory" tab="目录" />
          <n-tab name="page" tab="页面" />
          <n-tab name="permission" tab="权限" />
        </n-tabs>
      </template>
    </pro-field>

    <div class="grid grid-cols-2">
      <pro-tree-select
        tooltip="不填写则为顶层菜单"
        title="父级目录"
        path="parentId"
        :field-props="{
          options: treeData,
          keyField: 'value',
        }"
      />
      <pro-input
        required
        title="标题"
        path="title"
      />
      <component :is="currentFormComponent" />
      <pro-textarea
        title="备注"
        path="remark"
        class="col-span-2"
      />
    </div>
  </pro-modal-form>
</template>
