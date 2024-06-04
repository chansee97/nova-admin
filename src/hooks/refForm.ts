export function refForm<T>(initValue: T) {
  function jsonClone(value: T) {
    return JSON.parse(JSON.stringify(value))
  }
  const target = ref<T>(initValue)

  function setDefault() {
    target.value = jsonClone(initValue)
  }

  return {
    target,
    setDefault,
  }
}
