import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'

Vue.use(Router)
const router = new Router({
  routes: routers,
  mode: 'history',
})

const LOGIN_PAGE_NAME = 'login'
// router.beforeEach((to, from, next) => {
//
// })
export default router
