<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <n-card class="h-130vh">
    这个页面包含了一个不在侧边菜单的详情页面
    <n-button @click="router.push({ path: '/multi/multi2/detail', query: { id: 1 } })">
      跳转详情子页1
    </n-button>
    <n-button @click="router.push({ path: '/multi/multi2/detail', query: { id: 2 } })">
      跳转详情子页2
    </n-button>
    <n-button @click="router.push({ path: '/multi/multi2/detail', query: { id: 3 } })">
      跳转详情子页3
    </n-button>
  </n-card>
</template>

<style scoped></style>
