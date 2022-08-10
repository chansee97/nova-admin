<template>
  <n-layout has-sider wh-full>
    <n-layout-sider content-style="padding: 16px;" bordered>
      <router-link to="/test1">Go to test1</router-link>
      <br />
      <router-link to="/test2">Go to test2</router-link>
      <br />
      <router-link to="/test3">Go to test3</router-link>
      <br />
      <router-link to="/login" c-gray>Go to login</router-link>
    </n-layout-sider>
    <n-layout h-full bg-hex-f3-f4-f6 :native-scrollbar="false">
      <n-layout-header bordered text-2xl h-60px flex-y-center>layout-page</n-layout-header>
      <div p-16px>
        <n-layout-content>
          <router-view></router-view>
        </n-layout-content>
      </div>
      <n-layout-footer position="absolute" text-center op-80 bg-transparent>Ench admin</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped></style>
