<script setup lang="ts">
import { usePermission } from '@/hooks'
import { useAuthStore } from '@/store'

const authStore = useAuthStore()
const { hasPermission } = usePermission()

const roleList: Entity.RoleType[] = ['super', 'admin', 'user']

function toggleUserRole(role: Entity.RoleType) {
  authStore.login(role, '123456')
}
</script>

<template>
  <n-card title="权限示例">
    <n-h1> 当前权限：{{ authStore.userInfo!.role }}</n-h1>
    <n-button-group>
      <n-button v-for="item in roleList" :key="item" type="default" @click="toggleUserRole(item)">
        {{ item }}
      </n-button>
    </n-button-group>
    <n-h2>v-permission 指令用法</n-h2>
    <n-space>
      <n-button v-permission="['super']">
        仅super可见
      </n-button>
      <n-button v-permission="['admin']">
        admin可见
      </n-button>
    </n-space>

    <n-h2>usePermission 函数用法</n-h2>
    <n-space>
      <n-button v-if="hasPermission(['super'])">
        super可见
      </n-button>
      <n-button v-if="hasPermission(['admin'])">
        admin可见
      </n-button>
      <n-button v-if="hasPermission(['admin', 'user'])">
        admin和user可见
      </n-button>
    </n-space>
  </n-card>
</template>
