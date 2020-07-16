const dev = 'http://127.0.0.1:9090/'
// const pro = 'https://47.108.59.73:9090/'
const pro = 'http://jafir.nofoo.cn:9090/'
const baseUrl = process.env.NODE_ENV === 'development' ? dev : pro
export default {
  baseUrl: baseUrl,
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  homeName: 'home',
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'my-admin',
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: false // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  },
  gaodeMapKey: "99a4351b9ef488d99aaed60b1102cb71"
}
