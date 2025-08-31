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
    tooltip="目录类型的路由路径，如：/system"
    path="path"
    class="col-span-2"
    placeholder="Eg: /system"
  />
  <pro-digit
    title="排序"
    tooltip="数字越小，同级中越靠前"
    path="sort"
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
</template>
