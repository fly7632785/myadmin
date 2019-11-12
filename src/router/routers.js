import Main from '@/components/main'

export default [
  {
    path: '/login',
    name: 'login',
    title: '登录',
    meta: {
      hideInMenu: true,
      title: '登录',
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
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
          title: "首页",
          icon: 'md-home'
        },
        component: () => import('@/view/main/main.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      hideInBread: true,
      title: '测试',
      icon: 'ios-crop'
    },
    component: Main,
    children: [
      {
        path: 'test1',
        name: 'test1',
        meta: {
          title: "测试1",
          icon: 'logo-buffer'
        },
        component: () => import('@/view/test/test1.vue')
      },
      {
        path: 'test2',
        name: 'test2',
        meta: {
          title: "测试2",
          icon: 'ios-brush'
        },
        component: () => import('@/view/test/test2.vue')
      }
    ]
  },
  {
    path: '/test3',
    name: 'test3',
    meta: {
      title: '测试3',
      icon: 'md-watch'
    },
    component: Main
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      title: '退出登录',
      icon: 'md-close'
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      title: "error 401测试",
      icon: 'md-water'
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
