import { ref } from 'vue'
import { v4 } from 'uuid'

export const useId = () => {
  const guid = ref<string>(v4())

  const generateNewGuid = () => {
    guid.value = v4()
  }

  return {
    guid,
    generateNewGuid,
  }
}
