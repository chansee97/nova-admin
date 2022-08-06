<template>
  <div>layout-page</div>
  route:
  <br />
  <router-link to="/test1">Go to test1</router-link>
  |
  <router-link to="/test2">Go to test2</router-link>
  |
  <router-link to="/test3">Go to test3</router-link>
  <br />
  <router-link to="/login">Go to login</router-link>
  <router-view></router-view>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped></style>
