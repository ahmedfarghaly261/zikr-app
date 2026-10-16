import { computed, ref } from 'vue'
import { useHadith } from '@/modules/hadith/composables/useHadith'
import { duas } from '@/modules/duas/data/dua.data'

const NAWAWI_HADITH_COUNT = 42

function getDayNumber(date = new Date()) {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000)
}

export function useDailyContent() {
  const dayNumber = getDayNumber()
  const hadithNumber = ref((dayNumber % NAWAWI_HADITH_COUNT) + 1)
  const duaIndex = ref((dayNumber + 3) % duas.length)

  const {
    hadith: dailyHadith,
    isLoading: hadithLoading,
    error: hadithError,
    loadHadith: fetchHadith,
  } = useHadith()

  const dailyDua = computed(() => duas[duaIndex.value])

  function loadHadith() {
    return fetchHadith('ara-nawawi', hadithNumber.value)
  }

  function showAnotherHadith() {
    hadithNumber.value = (hadithNumber.value % NAWAWI_HADITH_COUNT) + 1
    return loadHadith()
  }

  function showAnotherDua() {
    duaIndex.value = (duaIndex.value + 1) % duas.length
  }

  loadHadith()

  return {
    dailyDua,
    dailyHadith,
    hadithLoading,
    hadithError,
    loadHadith,
    showAnotherDua,
    showAnotherHadith,
  }
}
