import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/absensi_masuk',
      name: 'absensi_masuk',
      component: () => import('../views/MasukView.vue')
    },
    {
      path: '/absensi_keluar',
      name: 'absensi_keluar',
      component: () => import('../views/KeluarView.vue')
    }
  ]
})

export default router
