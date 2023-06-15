<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue'
import { useAppStore } from '@/store'
const appStore = useAppStore()

const drawerActive = ref(false)
const openSetting = () => {
  drawerActive.value = !drawerActive.value
}
</script>

<template>
  <n-tooltip
    placement="bottom"
    trigger="hover"
  >
    <template #trigger>
      <HeaderButton @click="openSetting">
        <div>
          <i-icon-park-outline-setting-two />
          <n-drawer
            v-model:show="drawerActive"
            :width="300"
          >
            <n-drawer-content title="系统设置">
              <n-divider>主题设置</n-divider>
              <n-space vertical>
                <n-space justify="space-between">
                  深色模式
                  <n-switch
                    :value="appStore.darkMode"
                    @update:value="appStore.toggleDarkMode()"
                  />
                </n-space>
                <n-space justify="space-between">
                  色弱模式
                  <n-switch
                    :value="appStore.colorWeak"
                    @update:value="appStore.toggleColorWeak()"
                  />
                </n-space>
                <n-space justify="space-between">
                  灰色模式
                  <n-switch
                    :value="appStore.grayMode"
                    @update:value="appStore.toggleGrayMode()"
                  />
                </n-space>
              </n-space>
              <n-divider>界面显示</n-divider>
              <n-space vertical>
                <n-space justify="space-between">
                  LOGO显示
                  <n-switch
                    :value="appStore.showLogo"
                    @update:value="appStore.toggleShowLogo()"
                  />
                </n-space>
                <n-space justify="space-between">
                  多页签
                  <n-switch
                    :value="appStore.showTabs"
                    @update:value="appStore.toggleShowTabs()"
                  />
                </n-space>
                <n-space justify="space-between">
                  面包屑
                  <n-switch
                    :value="appStore.showBreadcrumb"
                    @update:value="appStore.toggleShowBreadcrumb()"
                  />
                </n-space>
                <n-space justify="space-between">
                  固定头部和多页签
                  <n-switch
                    :value="appStore.fixedHeader"
                    @update:value="appStore.toggleFixedHeader()"
                  />
                </n-space>
                <n-space justify="space-between">
                  侧边栏反转色
                  <n-switch
                    :value="appStore.invertedSider"
                    @update:value="appStore.toggleInvertedSider()"
                  />
                </n-space>
                <n-space justify="space-between">
                  头部反转色
                  <n-switch
                    :value="appStore.invertedHeader"
                    @update:value="appStore.toggleInvertedHeader()"
                  />
                </n-space>
                <n-space justify="space-between">
                  水印
                  <n-switch
                    :value="appStore.showWatermark"
                    @update:value="appStore.toggleShowWatermark()"
                  />
                </n-space>
              </n-space>
            </n-drawer-content>
          </n-drawer>
        </div>
      </HeaderButton>
    </template>
    <span>设置</span>
  </n-tooltip>
</template>

<style scoped></style>
