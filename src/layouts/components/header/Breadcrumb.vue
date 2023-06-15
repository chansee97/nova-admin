<script setup lang="ts">
import { useRouteStore } from '@/store'
import { useAppRouter } from '@/hooks'

const router = useRouter()
const routeStore = useRouteStore()
const { routerPush } = useAppRouter()
const routes = computed(() => {
  return routeStore.createBreadcrumbFromRoutes(router.currentRoute.value.name as string)
})
</script>

<template>
  <n-breadcrumb class="px-4">
    <n-breadcrumb-item
      v-for="(item, index) in routes"
      :key="index"
      @click="routerPush(item.path)"
    >
      <e-icon :icon="item.meta.icon" />
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped></style>
