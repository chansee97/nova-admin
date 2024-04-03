<script setup lang="ts"></script>

<template>
  <n-back-top :bottom="80" :visibility-height="300">
    <n-tooltip placement="left" trigger="hover">
      <template #trigger>
        <div wh-full flex-center>
          <icon-park-outline-to-top />
        </div>
      </template>
      <span>返回顶部</span>
    </n-tooltip>
  </n-back-top>
</template>

<style scoped></style>
