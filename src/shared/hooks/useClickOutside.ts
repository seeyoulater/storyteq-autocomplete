import { ref, onMounted, onUnmounted } from 'vue'

export function useClickOutside(elementRef: any, callback: () => void) {
  const isOutside = ref(false)

  const handleClickOutside = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      isOutside.value = true
      callback()
    } else {
      isOutside.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    isOutside,
  }
}
