<template>
  <pro-input
    title="国际化标识Key"
    path="i18nKey"
    placeholder="Eg: system.user"
  />
  <pro-field
    title="菜单图标"
    path="icon"
  >
    <template #input="{ inputProps }">
      <icon-select
        :value="inputProps.value"
        @update:value="inputProps.onUpdateValue"
      />
    </template>
  </pro-field>
  <pro-input
    required
    title="路由路径"
    tooltip="页面路由路径，与组件路径对应"
    path="path"
    class="col-span-2"
    placeholder="Eg: /system/user"
    @update:value="$emit('path', $event)"
  />
  <pro-input
    title="高亮菜单路径"
    tooltip="当前路由不在侧边菜单显示，但需要高亮为某个菜单"
    path="activePath"
    class="col-span-2"
    placeholder="Eg: /system/user"
  />
  <pro-input
    required
    title="组件路径"
    tooltip="页面组件的文件路径"
    path="component"
    class="col-span-2"
    placeholder="Eg: /system/user/index.vue"
  />
  <pro-digit
    title="排序"
    tooltip="数字越小，同级中越靠前"
    path="sort"
  />
  <pro-input
    title="权限标识"
    tooltip="页面访问权限标识"
    path="perms"
    placeholder="Eg: system:user:list"
  />
  <pro-switch
    title="启用"
    path="status"
    :field-props="{
      checkedValue: 0,
      uncheckedValue: 1,
    }"
  />
  <pro-switch
    title="菜单可见"
    path="menuVisible"
  />
  <pro-switch
    title="标签栏可见"
    path="tabVisible"
  />
  <pro-switch
    title="页面缓存"
    tooltip="开启配置后，切换页面数据不会清空"
    path="keepAlive"
  />
  <pro-switch
    title="常驻标签栏"
    path="pinTab"
  />
  <pro-switch
    title="外链菜单"
    tooltip="开启配置后，点击菜单会跳转到外链地址"
    path="isLink"
  />
</template>
