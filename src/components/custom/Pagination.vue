<script setup lang="ts">
const props = defineProps({
  count: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['change'])
const page = ref(1)
const pageSize = ref(10)
const displayOrder: Array<'pages' | 'size-picker' | 'quick-jumper'> = ['size-picker', 'pages']

function changePage() {
  emit('change', page.value, pageSize.value)
}
</script>

<template>
  <n-pagination
    v-if="props.count > 0"
    v-model:page="page"
    v-model:page-size="pageSize"
    :item-count="props.count"
    :display-order="displayOrder"
    show-size-picker
    @update-page="changePage"
    @update-page-size="changePage"
  />
</template>

<style scoped></style>
