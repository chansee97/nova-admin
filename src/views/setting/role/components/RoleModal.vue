<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createRole, getRoleById, updateRole } from '@/api'
import { createProModalForm } from 'pro-naive-ui'

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

const modalForm = createProModalForm<Partial<Entity.Role>>({
  omitEmptyString: false,
  initialValues: {
    roleName: '',
    roleKey: '',
    remark: '',
    sort: 0,
    roleStatus: 1,
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
      // 使用默认值
    },
    async edit() {
      if (!data)
        return

      const { data: role } = await getRoleById(data.roleId!)
      modalForm.values.value = role
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
      }
      catch (error) {
        console.error('创建角色失败', error)
        window.$message.error('创建角色失败')
      }
    },
    async edit() {
      try {
        await updateRole(modalForm.values.value.roleId!, filedValues)
        window.$message.success('角色更新成功')
      }
      catch (error) {
        console.error('更新角色失败', error)
        window.$message.error('更新角色失败')
      }
    },
  }
  startLoading()
  await handlers[modalType.value]()
  endLoading()
  emit('success')
  modalForm.close()
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
    width="600px"
  >
    <div class="grid grid-cols-2 gap-4">
      <pro-input
        required
        title="角色名称"
        path="roleName"
        placeholder="请输入角色名称"
      />
      <pro-input
        required
        title="角色权限"
        path="roleKey"
        placeholder="请输入角色权限"
      />
      <pro-textarea
        class="col-span-2"
        title="备注"
        path="remark"
        placeholder="请输入备注信息"
      />
      <pro-digit
        title="排序"
        path="sort"
        :field-props="{ min: 0, max: 999 }"
      />
      <pro-switch
        title="状态"
        path="roleStatus"
        :field-props="{ checkedValue: 1, uncheckedValue: 0 }"
      />
    </div>
  </pro-modal-form>
</template>
