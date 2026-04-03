import { ref } from 'vue'

export function useAzkarCounter(initialCount: number = 0) {
  const count = ref(initialCount)

  const increment = () => count.value++
  const decrement = () => {
    if (count.value > 0) count.value--
  }
  const reset = () => {
    count.value = initialCount
  }

  return {
    count,
    increment,
    decrement,
    reset,
  }
}
