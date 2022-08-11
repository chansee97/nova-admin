<template>
  <n-breadcrumb>
    <n-breadcrumb-item class="align-middle">
      <Icon icon="icon-park-outline:home-two" class="inline-block" width="16" />
      首页
    </n-breadcrumb-item>
    <n-breadcrumb-item v-for="(item, index) in routes" :key="index">
      <Icon :icon="item.meta.icon" class="inline-block" width="18" />
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const router = useRouter();
// const props = defineProps({
//   title: {
//     type: String,
//     default: 'Logo2',
//   },
//   collapsed: {
//     type: Boolean,
//     default: false,
//   },
// });
const routes = computed(() => {
  return router.currentRoute.value.matched.filter((item) => {
    return item.meta.title;
  });
});
</script>

<style scoped></style>
