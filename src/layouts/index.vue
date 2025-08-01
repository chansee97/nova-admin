<script setup lang="ts">
import { useAppStore, useRouteStore } from '@/store'
import {
  BackTop,
  Breadcrumb,
  CollapaseButton,
  FullScreen,
  Logo,
  Notices,
  Search,
  Setting,
  SettingDrawer,
  TabBar,
  UserCenter,
} from './components'
import Content from './Content.vue'

import { ProLayout, useLayoutMenu } from 'pro-naive-ui'

const route = useRoute()
const appStore = useAppStore()
const routeStore = useRouteStore()
const { layoutMode } = storeToRefs(useAppStore())

const {
  layout,
  activeKey,
} = useLayoutMenu({
  mode: layoutMode,
  accordion: true,
  menus: routeStore.menus,
})

watch(() => route.path, (value) => {
  activeKey.value = value
}, { immediate: true })

const sidebarWidth = ref(240)
const sidebarCollapsedWidth = ref(64)

const hasHorizontalMenu = computed(() => ['horizontal', 'mixed-two-column', 'mixed-sidebar'].includes(layoutMode.value))

const hidenCollapaseButton = computed(() => ['horizontal'].includes(layoutMode.value))
</script>

<template>
  <SettingDrawer />
  <ProLayout
    v-model:collapsed="appStore.collapsed"
    :mode="layoutMode"
    :show-logo="appStore.showLogo"
    :show-footer="appStore.showFooter"
    :show-tabbar="appStore.showTabs"
    nav-fixed
    show-nav
    show-sidebar
    :nav-height="60"
    :tabbar-height="45"
    :footer-height="40"
    :sidebar-width="sidebarWidth"
    :sidebar-collapsed-width="sidebarCollapsedWidth"
  >
    <template #logo>
      <Logo />
    </template>

    <template #nav-left>
      <div v-if="!hasHorizontalMenu || !hidenCollapaseButton" class="h-full flex-y-center gap-1 p-x-sm">
        <CollapaseButton v-if="!hidenCollapaseButton" />
        <Breadcrumb v-if="!hasHorizontalMenu" />
      </div>
    </template>

    <template #nav-center>
      <div class="h-full flex-y-center gap-1">
        <n-menu v-if="hasHorizontalMenu" v-bind="layout.horizontalMenuProps" />
      </div>
    </template>

    <template #nav-right>
      <div class="h-full flex-y-center gap-1 p-x-xl">
        <Search />
        <Notices />
        <FullScreen />
        <DarkModeSwitch />
        <LangsSwitch />
        <Setting />
        <UserCenter />
      </div>
    </template>

    <template #sidebar>
      <n-menu v-bind="layout.verticalMenuProps" :collapsed-width="sidebarCollapsedWidth" />
    </template>

    <template #sidebar-extra>
      <n-scrollbar class="flex-[1_0_0]">
        <n-menu v-bind="layout.verticalExtraMenuProps" :collapsed-width="sidebarCollapsedWidth" />
      </n-scrollbar>
    </template>

    <template #tabbar>
      <TabBar />
    </template>

    <template #footer>
      <div class="flex-center h-full">
        {{ appStore.footerText }}
      </div>
    </template>
    <Content />
    <BackTop />
    <SettingDrawer />
  </ProLayout>
</template>
