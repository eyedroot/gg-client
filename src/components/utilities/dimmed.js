import {ref} from 'vue'

export default function useDimmed() {
  const isDimmed = ref(false)

  const dimmed = (callback) => {
    if (typeof callback === 'function') {
      isDimmed.value = true

      setTimeout(() => {
        callback()
        isDimmed.value = false
      }, 0)
    }
  }

  return {
    isDimmed,
    dimmed,
  }
}
