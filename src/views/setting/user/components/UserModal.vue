<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createUser, getRoleOptions, getUserById, updateUser } from '@/api'
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

const modalForm = createProModalForm<Partial<Entity.User>>({
  omitEmptyString: false,
  initialValues: {
    gender: 'unknown',
    userStatus: 1,
    roles: [],
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
const roleOptions = ref<Entity.TreeNode[]>([])

async function openModal(type: ModalType = 'add', data?: Partial<Entity.User>) {
  modalType.value = type
  getRoleOptions().then((res) => {
    roleOptions.value = res.data
  })
  modalForm.open()
  const handlers = {
    async add() {
    },
    async edit() {
      if (!data)
        return

      const { data: user } = await getUserById(data.userId!)
      modalForm.values.value = user
    },
  }
  await handlers[type]()
}

async function submitModal(filedValues: Partial<Entity.User>) {
  const handlers = {
    async add() {
      try {
        await createUser(filedValues)
        window.$message.success('用户创建成功')
      }
      catch (error) {
        console.error('创建用户失败', error)
      }
    },
    async edit() {
      try {
        await updateUser(modalForm.values.value.userId!, filedValues)
        window.$message.success('用户更新成功')
      }
      catch (error) {
        console.error('更新用户失败', error)
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
    width="700px"
  >
    <div class="grid grid-cols-2">
      <pro-input
        required
        title="用户名"
        path="username"
        :readonly="modalType === 'edit'"
      />
      <pro-input
        title="昵称"
        path="nickName"
      />
      <pro-radio-group
        title="性别"
        path="gender"
        :field-props="{
          type: 'button',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        }"
      />
      <pro-digit
        title="部门ID"
        path="deptId"
      />
      <pro-input
        title="邮箱"
        path="email"
        placeholder="example@domain.com"
      />
      <pro-input
        title="手机号"
        path="phone"
        placeholder="11位手机号"
      />
      <pro-textarea
        class="col-span-2"
        title="备注"
        path="remark"
      />
      <pro-switch
        title="用户状态"
        path="userStatus"
        :field-props="{ checkedValue: 1, uncheckedValue: 0 }"
      />
      <pro-select
        class="col-span-2"
        title="角色"
        path="roles"
        :field-props="{ multiple: true, options: roleOptions }"
      />
    </div>
  </pro-modal-form>
</template>
