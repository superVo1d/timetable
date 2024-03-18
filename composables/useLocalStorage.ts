import { ref, watch } from 'vue'

export const useLocalStorage = (key: string) => {
  const item = ref(process.client ? (localStorage.getItem(key) || '') : '')

  watch(item, () => {
    if (!process.client) {
      return
    }

    if (item.value === '') {
      localStorage.removeItem(key)
      return
    }

    localStorage.setItem(key, item.value)
  })

  return { item }
}
