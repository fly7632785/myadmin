import routers from '@/router/routers'
import router from '@/router'
import config from '@/config'
import {
  getMenuByRouter,
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  getHomeRoute, routeEqual,
  getNextRoute,
  getRouteTitleHandled,
  routeHasExist,
} from '@/libs/util'

const {homeName} = config
const closePage = (state, route) => {
  //找出关闭之后 下一个跳转的界面 可能是主页
  const nextRoute = getNextRoute(state.tagNavList, route)
  //然后过滤关闭的界面 之外的就是剩下的tagList
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  //push 会导致route的监听变化，然后重新设置tagList的状态
  router.push(nextRoute)
}
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
  mutations: {
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagsNavList(state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else {
        tagList = getTagNavListFromLocalstorage() || [];
      }
      /**
       * 如果第一条不是首页  删除第一条
       * 找出所有中是首页的
       * 把那个位置删除
       * 把首页加到第一个
       *
       * 功能：保证首页在最前面
       */
      if (tagList[0] && tagList[0].name !== homeName) {
        tagList.shift()
      }
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList;
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag(state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    addError (state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus (state, status = true) {
      state.hasReadErrorPage = status
    }
  },
  actions: {
    addErrorLog ({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
      const { user: { token, userId, userName } } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
      // saveErrorLogger(info).then(() => {
        commit('addError', data)
      // })
    }
  }
}
