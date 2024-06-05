/**
 * Apply default value to a ref.
 */
export function useDefault<T>(defaultValue: T): Ref<T> {
  const source: Ref<T | undefined | null> = ref()

  return computed({
    get() {
      return source.value ?? defaultValue
    },
    set(value) {
      source.value = value
    },
  })
}
