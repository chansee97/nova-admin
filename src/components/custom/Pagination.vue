<template>
  <n-pagination
    v-if="props.count > 0"
    v-model:page="page"
    v-model:page-size="pageSize"
    :item-count="props.count"
    :display-order="displayOrder"
    show-size-picker
    :page-sizes="pageSizes"
    @update-page="changePage"
    @update-page-size="changePage"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['change']);
const props = defineProps({
  count: {
    type: Number,
    default: 0,
  },
});
const page = ref(1);
const pageSize = ref(10);
const displayOrder: Array<'pages' | 'size-picker' | 'quick-jumper'> = ['size-picker', 'pages'];
const pageSizes = [
  {
    label: '10 每页',
    value: 10,
  },
  {
    label: '20 每页',
    value: 20,
  },
  {
    label: '30 每页',
    value: 30,
  },
  {
    label: '50 每页',
    value: 50,
  },
];

function changePage() {
  emit('change', page.value, pageSize.value);
}
</script>

<style scoped></style>
