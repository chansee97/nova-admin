<template>
  <n-breadcrumb class="px-5">
    <n-breadcrumb-item v-for="(item, index) in routes" :key="index">
      <e-icon :icon="item.meta.icon" />
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = computed(() => {
  return router.currentRoute.value.matched.filter((item) => {
    return item.meta.title;
  });
});
</script>

<style scoped></style>
