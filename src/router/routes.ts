import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      // Add your routes here
    ],
  },
]

export default routes
