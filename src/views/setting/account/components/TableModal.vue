<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createUser, fetchRoleList, updateUser } from '@/service'

interface Props {
  modalName?: string
}

const {
  modalName = '',
} = defineProps<Props>()

const emit = defineEmits<{
  open: []
  close: []
  success: []
}>()

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const { bool: submitLoading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const formDefault = {
  userId: 0,
  username: '',
  nickName: '',
  email: '',
  phone: '',
  gender: 'unknown' as 'male' | 'female' | 'unknown',
  deptId: undefined,
  userStatus: 1,
  roles: [] as any[],
  remark: '',
}
const formModel = ref<Partial<Entity.User>>({ ...formDefault })

type ModalType = 'add' | 'view' | 'edit'
const modalType = shallowRef<ModalType>('add')
const modalTitle = computed(() => {
  const titleMap: Record<ModalType, string> = {
    add: '添加',
    view: '查看',
    edit: '编辑',
  }
  return `${titleMap[modalType.value]}${modalName}`
})

async function openModal(type: ModalType = 'add', data: any) {
  emit('open')
  modalType.value = type
  showModal()
  getRoleList()
  const handlers = {
    async add() {
      formModel.value = { ...formDefault }
    },
    async view() {
      if (!data)
        return
      formModel.value = { ...data }
    },
    async edit() {
      if (!data)
        return
      formModel.value = { ...data }
    },
  }
  await handlers[type]()
}

function closeModal() {
  hiddenModal()
  endLoading()
  emit('close')
}

defineExpose({
  openModal,
})

const formRef = ref()
async function submitModal() {
  const handlers = {
    async add() {
      try {
        await createUser({
          username: formModel.value.username!,
          password: '123456', // 默认密码
          nickName: formModel.value.nickName,
          email: formModel.value.email,
          phone: formModel.value.phone,
          gender: formModel.value.gender,
          deptId: formModel.value.deptId,
          remark: formModel.value.remark,
        })
        window.$message.success('用户创建成功')
        emit('success')
        return true
      }
      catch {
        window.$message.error('创建用户失败')
        return false
      }
    },
    async edit() {
      try {
        await updateUser(formModel.value.userId!, {
          nickName: formModel.value.nickName,
          email: formModel.value.email,
          phone: formModel.value.phone,
          gender: formModel.value.gender,
          userStatus: formModel.value.userStatus,
          deptId: formModel.value.deptId,
          remark: formModel.value.remark,
        })
        window.$message.success('用户更新成功')
        emit('success')
        return true
      }
      catch {
        window.$message.error('更新用户失败')
        return false
      }
    },
    async view() {
      return true
    },
  }
  await formRef.value?.validate()
  startLoading()
  const success = await handlers[modalType.value]()
  endLoading()
  if (success) {
    closeModal()
  }
}

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
  },
  email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/,
    message: '请输入正确的邮箱格式',
    trigger: 'blur',
  },
  phone: {
    required: false,
    pattern: /^1[3-9]\d{9}$/,
    message: '请输入正确的手机号格式',
    trigger: 'blur',
  },
}

const options = ref()
async function getRoleList() {
  const { data } = await fetchRoleList()
  options.value = data
}
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    :mask-closable="false"
    preset="card"
    :title="modalTitle"
    class="w-700px"
    :segmented="{
      content: true,
      action: true,
    }"
  >
    <n-form ref="formRef" :rules="rules" label-placement="left" :model="formModel" :label-width="100" :disabled="modalType === 'view'">
      <n-grid :cols="2" :x-gap="18">
        <n-form-item-grid-item :span="1" label="用户名" path="username">
          <n-input v-model:value="formModel.username" :disabled="modalType === 'edit'" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="昵称" path="nickName">
          <n-input v-model:value="formModel.nickName" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="性别" path="gender">
          <n-radio-group v-model:value="formModel.gender">
            <n-space>
              <n-radio value="male">
                男
              </n-radio>
              <n-radio value="female">
                女
              </n-radio>
              <n-radio value="unknown">
                未知
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="部门ID" path="deptId">
          <n-input-number v-model:value="formModel.deptId" class="w-full" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="邮箱" path="email">
          <n-input v-model:value="formModel.email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="手机号" path="phone">
          <n-input v-model:value="formModel.phone" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="2" label="备注" path="remark">
          <n-input v-model:value="formModel.remark" type="textarea" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="用户状态" path="userStatus">
          <n-switch
            v-model:value="formModel.userStatus"
            :checked-value="1" :unchecked-value="0"
          >
            <template #checked>
              启用
            </template>
            <template #unchecked>
              禁用
            </template>
          </n-switch>
        </n-form-item-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal">
          取消
        </n-button>
        <n-button type="primary" :loading="submitLoading" @click="submitModal">
          提交
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
