import Main from '@/components/main'
import {getComponents} from '@/libs/util'


export default [
  {
    path: '/login',
    name: 'login',
    title: '登录',
    meta: {
      hideInMenu: true,
      title: '登录',
    },
    component: getComponents('login')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    meta: {
      title: '主页',
      icon: 'md-home'
    },
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: "主页",
          icon: 'md-home'
        },
        component: getComponents('main')
      }
    ]
  },
  {
    path: '/gps',
    name: 'gps',
    meta: {
      title: '地图相关',
      icon: 'md-home'
    },
    component: Main,
    children: [
      {
        path: '/nowHps',
        name: 'nowHps',
        meta: {
          title: "实时定位",
          icon: 'md-home'
        },
        component: getComponents('now-gps')
      },
      {
        path: '/gpsHis',
        name: 'gpsHis',
        meta: {
          title: "历史轨迹",
          icon: 'md-home'
        },
        component: getComponents('gps-history')
      }
    ]
  },
  {
    path: '/mine',
    name: 'mine',
    meta: {
      title: '个人中心',
      icon: 'md-home'
    },
    component: Main,
    children: [
      {
        path: '/info',
        name: 'info',
        meta: {
          title: "信息资料",
          icon: 'md-home'
        },
        component: getComponents('mine')
      }
    ]
  }
  // {
  //   path: '/error_logger',
  //   name: 'error_logger',
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_logger_page',
  //       name: 'error_logger_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: getComponents('error-page', 'error-logger')
  //     }
  //   ]
  // },
  // {
  //   path: '/test',
  //   name: 'test',
  //   meta: {
  //     hideInBread: true,
  //     title: '测试',
  //     icon: 'ios-crop'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'test1',
  //       name: 'test1',
  //       meta: {
  //         beforeCloseName: 'before_close_normal',
  //         title: "测试1",
  //         icon: 'logo-buffer'
  //       },
  //       component: getComponents('test', 'test1')
  //     },
  //     {
  //       path: 'test2',
  //       name: 'test2',
  //       meta: {
  //         title: "测试2",
  //         icon: 'ios-brush'
  //       },
  //       component: getComponents('test', 'test2')
  //     },
  //     {
  //       path: 'test3',
  //       name: 'test3',
  //       meta: {
  //         title: "测试3",
  //         icon: 'ios-brush'
  //       },
  //       component: getComponents('test', 'test3')
  //     }
  //   ]
  // },
  // {
  //   path: '/test3',
  //   name: 'test3',
  //   meta: {
  //     title: '测试3',
  //     icon: 'md-watch'
  //   }
  //   ,
  //   component: Main
  // },
  // {
  //   path: '/query',
  //   name: 'query',
  //   meta: {
  //     title: '我的查询',
  //     icon: 'md-watch'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/query1',
  //       name: 'query1',
  //       meta: {
  //         title: "我的查询",
  //         icon: 'md-watch'
  //       },
  //       component: getComponents('query')
  //     }
  //   ]
  // },
  // {
  //   path: '/401',
  //   name: 'error_401',
  //   meta: {
  //     title: "error 401测试",
  //     icon: 'md-water'
  //   },
  //   component: getComponents('error-page', '401')
  // },
  // {
  //   path: '/500',
  //   name: 'error_500',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: getComponents('error-page', '500')
  // },
  // {
  //   path: '*',
  //   name: 'error_404',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: getComponents('error-page', '404')
  // }
]
