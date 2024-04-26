<script setup lang="ts">
import { useTabStore } from '@/store'
import { renderIcon } from '@/utils'

const tabStore = useTabStore()

const { t } = useI18n()

function renderDropTabsLabel(option: any) {
  return t(`route.${String(option.name)}`, option.meta.title)
}
function renderDropTabsIcon(option: any) {
  return renderIcon(option.meta.icon)!()
}

const router = useRouter()
function handleDropTabs(key: string, option: any) {
  router.push(option.path)
}
</script>

<template>
  <n-dropdown
    :options="tabStore.allTabs"
    :render-label="renderDropTabsLabel"
    :render-icon="renderDropTabsIcon"
    trigger="click"
    size="small"
    @select="handleDropTabs"
  >
    <CommonWrapper>
      <icon-park-outline-application-menu />
    </CommonWrapper>
  </n-dropdown>
</template>

<style scoped>

</style>
