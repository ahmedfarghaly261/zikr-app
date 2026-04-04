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
      }
    ],
  },
]

export default routes
