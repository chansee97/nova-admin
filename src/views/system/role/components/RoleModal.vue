<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createRole, getRoleById, updateRole } from '@/api'
import { createProModalForm } from 'pro-naive-ui'
import TreeDeptSelect from './TreeDeptSelect.vue'
import TreeMenuSelect from './TreeMenuSelect.vue'

interface Props {
  modalName?: string
}

const {
  modalName = '',
} = defineProps<Props>()

const emit = defineEmits<{
  success: []
}>()

const { bool: submitLoading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const modalForm = createProModalForm<Partial<Entity.Role> & { deptIds?: number[], menuIds?: number[] }>({
  omitEmptyString: false,
  initialValues: {
    status: 0,
    dataScope: 1,
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
  return `${titleMap[modalType.value]}${modalName}`
})

async function openModal(type: ModalType = 'add', data?: Partial<Entity.Role>) {
  modalType.value = type
  modalForm.open()

  const handlers = {
    async add() {
    },
    async edit() {
      if (!data)
        return

      const { data: role } = await getRoleById(data.id!)
      modalForm.values.value = role
      // 设置已选中的菜单和部门
      modalForm.values.value.menuIds = role.menus?.map(menu => menu.id) || []
      modalForm.values.value.deptIds = role.depts?.map(dept => dept.id) || []
    },
  }
  await handlers[type]()
}

async function submitModal(filedValues: Partial<Entity.Role>) {
  const handlers = {
    async add() {
      try {
        await createRole(filedValues)
        window.$message.success('角色创建成功')
        return true
      }
      catch (error) {
        console.error('创建角色失败', error)
        return false
      }
    },
    async edit() {
      try {
        await updateRole(modalForm.values.value.id!, filedValues)
        window.$message.success('角色更新成功')
        return true
      }
      catch (error) {
        console.error('更新角色失败', error)
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

defineExpose({
  openModal,
})
</script>

<template>
  <pro-modal-form
    :title="modalTitle"
    :form="modalForm"
    :loading="submitLoading"
    width="800px"
  >
    <div class="grid grid-cols-2 gap-4">
      <pro-input
        required
        title="角色名称"
        path="roleName"
      />
      <pro-input
        required
        title="权限标识"
        path="roleKey"
      />
      <pro-switch
        title="状态"
        path="status"
        :field-props="{ checkedValue: 0, uncheckedValue: 1 }"
      />
      <pro-select
        title="数据范围"
        path="dataScope"
        :field-props="{
          options: [
            { label: '全部数据权限', value: 1 },
            { label: '自定数据权限', value: 2 },
            { label: '本部门数据权限', value: 3 },
            { label: '本部门及以下数据权限', value: 4 },
            { label: '仅本人数据权限', value: 5 },
          ],
        }"
      />
      <pro-field
        class="col-span-2"
        title="菜单权限"
        path="menuIds"
      >
        <template #input="{ inputProps }">
          <TreeMenuSelect
            :value="inputProps.value"
            @update:value="inputProps.onUpdateValue"
          />
        </template>
      </pro-field>

      <pro-field
        v-if="modalForm.values.value.dataScope === 2"
        class="col-span-2"
        title="数据权限"
        path="deptIds"
      >
        <template #input="{ inputProps }">
          <TreeDeptSelect
            :value="inputProps.value"
            @update:value="inputProps.onUpdateValue"
          />
        </template>
      </pro-field>

      <pro-textarea
        class="col-span-2"
        title="备注"
        path="remark"
      />
    </div>
  </pro-modal-form>
</template>
