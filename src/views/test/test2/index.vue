<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div text-center>
    这个页面包含了一个不在侧边菜单的详情页面
    <n-button @click="router.push('/test/test2/detail')">
      跳转详情子页
    </n-button>
  </div>
</template>

<style scoped></style>
