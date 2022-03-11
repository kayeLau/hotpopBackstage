import { createRouter, createWebHistory } from 'vue-router'
import dataPage from '../views/dataPage.vue'
import settingPage from '../views/settingPage.vue'
import homePage from '../views/homePage.vue'

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage
  },
  {
    path: '/dataPage',
    name: 'dataPage',
    component: dataPage
  },
  {
    path: '/settingPage',
    name: 'settingPage',
    component: settingPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
