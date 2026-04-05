// import { ref } from 'vue'
// import { AzkarService } from '../services/azkar.service'
// import type { Azkar } from '../types/azkar.types'

// export function useAzkar() {
//   const azkarList = ref<Azkar[]>([])
//   const loading = ref(false)
//   const error = ref<string | null>(null)

//   const fetchAzkar = async () => {
//     loading.value = true
//     error.value = null
//     try {
//       azkarList.value = await AzkarService.getAll()
//     } catch (err) {
//       error.value = err instanceof Error ? err.message : 'An error occurred'
//     } finally {
//       loading.value = false
//     }
//   }

//   return {
//     azkarList,
//     loading,
//     error,
//     fetchAzkar,
//   }
// }
