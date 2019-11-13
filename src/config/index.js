export default {
  baseUrl: {
    dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    pro: 'https://produce.com'
  },
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
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
