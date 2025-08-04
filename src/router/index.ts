import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../Views/Dashboard/Parts/Orders/DashboardOrdersMainTemplate.vue'),
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../Views/OrdersMain.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../Views/Auth.vue'),
    },
    {
      path: '/default',
      name: 'default',
      component: () => import('../Views/Default.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../Views/Dashboard.vue'),
    },
  ],
})

export default router
