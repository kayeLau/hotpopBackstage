import { createRouter, createWebHistory } from 'vue-router'
import takeawayDataPage from '../views/takeawayDataPage.vue'
import settingPage from '../views/settingPage.vue'
import homePage from '../views/homePage.vue'

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage
  },
  {
    path: '/takeawayDataPage',
    name: 'takeawayDataPage',
    component: takeawayDataPage
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
