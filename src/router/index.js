import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: import('../views/Login.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('../views/team/TeamInfoView.vue')
  },
  {
    path: '/team/create',
    name: 'teamCreate',
    component: () => import('../views/team/TeamCreateView.vue')
  },
  {
    path: '/editor',
    name:'editor',
    component: import('../views/Editor.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
