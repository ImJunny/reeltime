import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../views/MoviesView.vue'),
    },
    {
      path: '/party/:id',
      name: 'party',
      component: () => import('../views/PartyView.vue'),
    },
  ],
})

export default router
