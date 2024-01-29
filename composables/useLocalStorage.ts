import { ref, watch } from 'vue'

export const useLocalStorage = (key: string) => {
  const item = ref(localStorage.getItem(key) || '')

  watch(item, () => {
    if (item.value === '') {
      localStorage.removeItem(key)
      return
    }

    localStorage.setItem(key, item.value)
  })

  return { item }
}
