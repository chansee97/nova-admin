<template>
  <div text-center flex-center wh-full>
    <n-carousel autoplay w-500px>
      <img
        h-screen
        object-cover
        src="https://images.unsplash.com/photo-1659991689791-db84493f8544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"
      />
      <img
        object-cover
        h-screen
        src="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      />
      <img
        h-screen
        object-cover
        src="https://images.unsplash.com/photo-1657299156568-c94580e20fb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      />
      <img
        object-cover
        h-screen
        src="https://images.unsplash.com/photo-1659983391845-47ea9d99e7bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      />
    </n-carousel>
    <div c-lightBlue flex-1><router-link to="/">Go to layout</router-link></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
