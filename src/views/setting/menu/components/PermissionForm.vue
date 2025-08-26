<template>
  <pro-input
    required
    title="权限标识"
    tooltip="按钮权限唯一标识符"
    path="perms"
    placeholder="Eg: system:user:add"
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
</template>
