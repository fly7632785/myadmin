import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import './index.less'
import config from '@/config'

Vue.config.productionTip = false
// if (process.env.NODE_ENV !== 'production') require('@/mock')

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.use(iView)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

