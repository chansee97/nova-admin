<script setup lang="ts">
interface Props {
  list?: Entity.Message[]
}
const { list } = defineProps<Props>()

const emit = defineEmits<Emits>()
interface Emits {
  (e: 'read', val: number): void
}
</script>

<template>
  <n-scrollbar style="height: 400px">
    <n-list hoverable clickable>
      <n-list-item v-for="(item) in list" :key="item.id" @click="emit('read', item.id)">
        <n-thing content-indented :class="{ 'opacity-30': item.isRead }">
          <template #header>
            <n-ellipsis :line-clamp="1">
              {{ item.title }}
            </n-ellipsis>
          </template>
          <template #avatar>
            <nova-icon :icon="item.icon" :size="30" class="c-primary" />
          </template>
          <template v-if="item.tagTitle" #header-extra>
            <n-tag :bordered="false" :type="item.tagType" size="small">
              {{ item.tagTitle }}
            </n-tag>
          </template>
          <template v-if="item.description" #description>
            <n-ellipsis :line-clamp="2">
              {{ item.description }}
            </n-ellipsis>
          </template>
          <template #footer>
            {{ item.date }}
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </n-scrollbar>
</template>

<style scoped></style>
