import { onBeforeMount, onBeforeUnmount } from 'vue'
import { KeyCode } from '@/shared/lib/keycode.ts'

export const useKeyboard = (code: KeyCode, callback: () => void) => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.code === code) {
      callback()
    }
  }

  onBeforeMount(() => window.addEventListener('keydown', handleKey))
  onBeforeUnmount(() => window.removeEventListener('keydown', handleKey))
}
