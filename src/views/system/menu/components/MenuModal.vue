<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createMenu, getMenuById, getMenuOptions, updateMenu } from '@/api'
import { createProModalForm } from 'pro-naive-ui'

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

async function openModal(type: ModalType = 'add', data?: Partial<Entity.Menu>) {
  getMenuOptions(true).then((res) => {
    treeData.value = res.data
  })

  modalType.value = type
  modalForm.open()
  const handlers = {
    async add() {
      // 如果新增传入了menuId，设置为父级菜单
      if (data?.id) {
        modalForm.values.value.parentId = data.id
        modalForm.values.value.path = `${data.path}/`
      }

      if (data?.menuType === 'directory') {
        modalForm.values.value.menuType = 'page'
      }

      if (data?.menuType === 'page') {
        modalForm.values.value.menuType = 'permission'
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
        return true
      }
      catch (error) {
        console.error('创建菜单失败', error)
        return false
      }
    },
    async edit() {
      try {
        await updateMenu(modalForm.values.value.id!, filedValues)
        window.$message.success('菜单更新成功')
        return true
      }
      catch (error) {
        console.error('更新菜单失败', error)
        return false
      }
    },
  }

  startLoading()
  const success = await handlers[modalType.value]()
  endLoading()

  if (success) {
    emit('success')
    modalForm.close()
  }
}

function handlePathChange(path: string) {
  modalForm.values.value.component = `${path}/index.vue`
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
    label-width="120px"
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
        title="名称"
        path="title"
      />
      <pro-input
        v-if="modalForm.values.value.menuType !== 'permission'"
        title="国际化标识Key"
        path="i18nKey"
        placeholder="Eg: system.user"
      />
      <pro-field
        v-if="modalForm.values.value.menuType !== 'permission'"
        title="菜单图标"
        path="icon"
      >
        <template #input="{ inputProps }">
          <icon-select
            :value="inputProps.value"
            @update:value="inputProps.onUpdateValue"
          />
        </template>
      </pro-field>
      <pro-input
        v-if="modalForm.values.value.menuType !== 'permission'"
        required
        title="路由路径"
        tooltip="页面路由路径，与组件路径对应"
        path="path"
        class="col-span-2"
        placeholder="Eg: /system/user"
        @change="handlePathChange"
      />
      <pro-input
        v-if="modalForm.values.value.menuType === 'page'"
        required
        title="组件路径"
        tooltip="页面组件的文件路径"
        path="component"
        class="col-span-2"
        placeholder="Eg: /system/user/index.vue"
      />

      <pro-digit
        title="排序"
        tooltip="数字越小，同级中越靠前， 默认为0"
        path="sort"
      />
      <pro-input
        title="权限标识"
        tooltip="需与后端装饰器一致，如@RequirePermissions('system:user:list')"
        path="perms"
        placeholder="Eg: system:user:list"
      />
      <pro-switch
        title="启用"
        path="status"
        :field-props="{
          checkedValue: 0,
          uncheckedValue: 1,
        }"
      />
      <pro-textarea
        title="备注"
        path="remark"
        class="col-span-2"
      />
      <n-collapse v-if="modalForm.values.value.menuType === 'page'" class="col-span-2">
        <n-collapse-item>
          <template #header>
            <icon-park-outline-setting class="mr-2" />
            高级设置
          </template>
          <div class="grid grid-cols-2">
            <pro-input
              title="高亮菜单路径"
              tooltip="当前路由不在侧边菜单显示，但需要高亮为某个菜单"
              path="activePath"
              class="col-span-2"
              placeholder="Eg: /system/user"
            />
            <pro-switch
              title="菜单可见"
              path="menuVisible"
            />
            <pro-switch
              title="标签栏可见"
              path="tabVisible"
            />
            <pro-switch
              title="页面缓存"
              tooltip="开启配置后，切换页面数据不会清空"
              path="keepAlive"
            />
            <pro-switch
              title="常驻标签栏"
              path="pinTab"
            />
            <pro-switch
              title="跳转外链"
              tooltip="开启配置后，点击菜单会跳转到外链地址"
              path="isLink"
            />
            <pro-input
              v-if="modalForm.values.value.isLink"
              required
              title="外链地址"
              tooltip="开启跳转外链配置后，点击菜单会跳转到外链地址"
              path="linkPath"
              class="col-span-2"
              placeholder="Eg: https://www.baidu.com"
            />
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
  </pro-modal-form>
</template>
