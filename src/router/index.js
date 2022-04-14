import { createRouter, createWebHistory } from 'vue-router'
import takeawayDataPage from '../views/takeawayDataPage.vue'
import homePage from '../views/homePage.vue'
import shopBookingList from '../views/setting/shopBookingList.vue'
import settingPage from '../views/setting/unormalSetting.vue'
import bookingSetting from '../views/setting/bookingSetting.vue'

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
    path: '/setting/unormalSetting',
    name: 'settingPage',
    component: settingPage
  },
  {
    path: '/setting/bookingSetting',
    name: 'bookingSetting',
    component: bookingSetting
  },
  {
    path: '/setting/shopBookingList',
    name: 'shopBookingList',
    component: shopBookingList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
