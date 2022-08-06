<template>
  <div text-3xl text-center>layout-page</div>
  <div text-center>
    <router-link to="/test1">Go to test1</router-link>
    |
    <router-link to="/test2">Go to test2</router-link>
    |
    <router-link to="/test3">Go to test3</router-link>
    |
    <router-link to="/login" c-gray>Go to login</router-link>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped></style>
