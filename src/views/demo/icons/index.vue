<template>
  <n-space vertical>
    <n-card title="图标选择器">
      <icon-select />
    </n-card>
    <n-card title="自动导入图标">
      <div>
        正常：<icon-park-outline-apple />
      </div>
      <div>
        大：<icon-park-outline-apple class="text-2em" />
      </div>
      <div>
        大大大：<icon-park-outline-apple class="text-4em" />
      </div>
    </n-card>
    <n-card title="自动导入svg图标">
      <div>
        正常：<svg-icons-cool />
      </div>
      <div>
        大：<svg-icons-cool class="text-2em" />
      </div>
      <div>
        大大大：<svg-icons-cool class="text-4em" />
      </div>
      <div>
        nova-icon组件加载：<nova-icon icon="local:cool" />
      </div>
    </n-card>
  </n-space>
</template>
