import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/modules/home/views/HomeView.vue')
      },
      {
        path: 'azkar',
        name: 'Azkar',
        component: () => import('@/modules/azkar/views/AthkarView.vue')
      },
      {
        path: 'dua',
        name: 'Duas',
        component: () => import('@/modules/duas/views/AdeiaView.vue')
      },
      {
        path: 'hadith',
        name: 'Hadith',
        component: () => import('@/modules/hadith/views/HadithView.vue')
      },
      {
        path: 'prayer-times',
        name: 'PrayerTimes',
        component: () => import('@/modules/prayer-times/views/PrayerView.vue')
      },
      {
        path: 'quran',
        name: 'Quran',
        component: () => import('@/modules/quran/views/quranView.vue')
      },
      {
        path: 'quran/:number',
        name: 'Surah',
        component: () => import('@/modules/quran/views/SurahView.vue'),
      },
    ],
  },
]

export default routes
