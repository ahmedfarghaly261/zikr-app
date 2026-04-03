import { ref } from 'vue'

export function useAudioPlayer(audioUrl: string) {
  const audio = ref<HTMLAudioElement | null>(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)

  const initAudio = () => {
    if (!audio.value) {
      audio.value = new Audio(audioUrl)
      audio.value.addEventListener('play', () => {
        isPlaying.value = true
      })
      audio.value.addEventListener('pause', () => {
        isPlaying.value = false
      })
      audio.value.addEventListener('timeupdate', () => {
        currentTime.value = audio.value?.currentTime || 0
      })
      audio.value.addEventListener('loadedmetadata', () => {
        duration.value = audio.value?.duration || 0
      })
    }
  }

  const play = () => {
    if (audio.value) {
      audio.value.play()
    } else {
      initAudio()
      audio.value?.play()
    }
  }

  const pause = () => {
    audio.value?.pause()
  }

  const stop = () => {
    if (audio.value) {
      audio.value.pause()
      audio.value.currentTime = 0
    }
  }

  return {
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    stop,
  }
}
