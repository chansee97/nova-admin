<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const routes = computed(() => {
  return route.matched
})
</script>

<template>
  <TransitionGroup name="list" tag="ul" style="display: flex; gap:1em;">
    <n-el
      v-for="(item) in routes"
      :key="item.path"
      tag="li" style="
            color: var(--text-color-2);
            transition: 0.3s var(--cubic-bezier-ease-in-out);
          "
      class="flex-center gap-2 cursor-pointer split"
      @click="router.push(item.path)"
    >
      <e-icon :icon="item.meta.icon" />
      {{ item.meta.title }}
    </n-el>
  </TransitionGroup>
</template>

<style lang="scss">
.split:not(:first-child)::before {
   content: '/';
   padding-right:0.6em;
}

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
}
</style>
