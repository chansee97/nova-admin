<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const drawerActive = ref(false)
function openSetting() {
  drawerActive.value = !drawerActive.value
}
const transitionSelectorOptions = [
  {
    label: '无',
    value: '',
  },
  {
    label: '侧滑',
    value: 'fade-slide',
  },
  {
    label: '下滑',
    value: 'fade-bottom',
  },
  {
    label: '收缩',
    value: 'fade-scale',
  },
  {
    label: '扩张',
    value: 'zoom-fade',
  },
  {
    label: '坍缩',
    value: 'zoom-out',
  },
  {
    label: '柔和',
    value: 'fade',
  },
]

const palette = [
  '#ffb8b8',
  '#d03050',
  '#F0A020',
  '#fff200',
  '#ffda79',
  '#18A058',
  '#006266',
  '#22a6b3',
  '#18dcff',
  '#2080F0',
  '#c56cf0',
  '#be2edd',
  '#706fd3',
  '#4834d4',
  '#130f40',
  '#4b4b4b',
]

function resetSetting() {
  window.$dialog.warning({
    title: '重置所有设置',
    content: '你确定重置所有设置？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      appStore.resetAlltheme()
      window.$message.success('重置成功')
    },
  })
}
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="openSetting">
        <div>
          <i-icon-park-outline-setting-two />
          <n-drawer v-model:show="drawerActive" :width="300">
            <n-drawer-content title="系统设置" closable>
              <n-space vertical>
                <n-divider>主题设置</n-divider>
                <n-space justify="space-between">
                  深色模式
                  <n-switch :value="appStore.darkMode" @update:value="appStore.toggleDarkMode" />
                </n-space>
                <n-space justify="space-between">
                  色弱模式
                  <n-switch :value="appStore.colorWeak" @update:value="appStore.toggleColorWeak" />
                </n-space>
                <n-space justify="space-between">
                  灰色模式
                  <n-switch :value="appStore.grayMode" @update:value="appStore.toggleGrayMode" />
                </n-space>
                <n-space align="center" justify="space-between">
                  主题色
                  <n-color-picker
                    v-model:value="appStore.primaryColor"
                    class="w-7em" :swatches="palette" :show-alpha="false"
                    @update:value="appStore.setPrimaryColor"
                  />
                </n-space>
                <n-space align="center" justify="space-between">
                  切换动效
                  <n-select v-model:value="appStore.transitionAnimation" class="w-7em" :options="transitionSelectorOptions" @update:value="appStore.reloadPage" />
                </n-space>

                <n-divider>界面显示</n-divider>
                <n-space justify="space-between">
                  LOGO显示
                  <n-switch v-model:value="appStore.showLogo" />
                </n-space>
                <n-space justify="space-between">
                  顶部进度
                  <n-switch v-model:value="appStore.showProgress" />
                </n-space>
                <n-space justify="space-between">
                  多页签显示
                  <n-switch v-model:value="appStore.showTabs" />
                </n-space>
                <n-space justify="space-between">
                  底部标签显示
                  <n-switch v-model:value="appStore.showFooter" />
                </n-space>
                <n-space justify="space-between">
                  面包屑
                  <n-switch v-model:value="appStore.showBreadcrumb" />
                </n-space>
                <n-space justify="space-between">
                  面包屑图标
                  <n-switch v-model:value="appStore.showBreadcrumbIcon" />
                </n-space>
                <n-space justify="space-between">
                  水印
                  <n-switch v-model:value="appStore.showWatermark" />
                </n-space>
              </n-space>

              <template #footer>
                <n-button type="error" @click="resetSetting">
                  重置设置
                </n-button>
              </template>
            </n-drawer-content>
          </n-drawer>
        </div>
      </HeaderButton>
    </template>
    <span>设置</span>
  </n-tooltip>
</template>

<style scoped></style>
