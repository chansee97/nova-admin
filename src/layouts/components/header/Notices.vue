<template>
  <n-popover placement="bottom" trigger="click" arrow-point-to-center style="width: 400px">
    <template #trigger>
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <HeaderButton @click="openNotice">
            <i-icon-park-outline-remind class="text-18px" />
          </HeaderButton>
        </template>
        <span>消息通知</span>
      </n-tooltip>
    </template>
    <n-tabs type="line" animated justify-content="space-evenly">
      <n-tab-pane name="chap1" tab="通知">
        我这辈子最疯狂的事，发生在我在 Amazon 当软件工程师的时候，故事是这样的：
      </n-tab-pane>
      <n-tab-pane name="chap2" tab="消息">
        “威尔！着火了！快来帮忙！”我听到女朋友大喊。现在一个难题在我面前——是恢复一个重要的 Amazon 服务，还是救公寓的火。
      </n-tab-pane>
      <n-tab-pane name="chap3" tab="待办">
        但是忽然，公寓的烟味消失，火警也停了。我的女朋友走进了房间，让我震惊的是，她摘下了自己的假发，她是 Jeff
      </n-tab-pane>
    </n-tabs>
  </n-popover>
</template>

<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue';
const openNotice = () => {
  console.log('消息通知');
};
</script>

<style scoped></style>
