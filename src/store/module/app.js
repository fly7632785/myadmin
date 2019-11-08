import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
import {
  getMenuByRouter,
} from '@/libs/util'

const {homeName} = config

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    errorList: [],
    hasReadErrorPage: false
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    errorCount: state => state.errorList.length
  },
  mutations: {},
  actions: {}
}
