export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    // component: () => import('@/view/login/login.vue')
    component: '<div>foo</div>'
  },
  {
    path: '/',
    name: 'home',
    meta: {
      title: '主页',
    },
    component: () => import('@/view/main/main.vue')
  }
]
