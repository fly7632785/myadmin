import axios from 'axios'
import store from '@/store'
import {Message} from 'iview'

// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const {statusText, status, request: {responseURL}} = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  console.log("addErr:" + JSON.stringify(info))
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      // headers: {
      //   'Content-Type': "application/json;charset=utf-8"
      // }
    }
    return config
  }

  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }


  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      console.log("res:" + JSON.stringify(res))
      this.destroy(url)
      const {data: {code, data, msg}, config} = res
      if (code == 200) {
        return data;
      } else {
        this.dealErr(code, msg)
        let errorInfo = {
          statusText: msg,
          status: code,
          request: {responseURL: config.url}
        }
        addErrorLog(errorInfo)
        return Promise.reject(res.data)
      }
    }, error => {
      console.log("error:" + JSON.stringify(error))
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const {request: {statusText, status}, config} = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: {responseURL: config.url}
        }
        addErrorLog(errorInfo)
      }
      const data = {code: error.request.status, msg: error.request.statusText}
      this.dealErr(data.code, data.msg)
      return Promise.reject(data)
    })
  }


  dealErr(c, msg) {
    console.log("code:" + c)
    console.log("msg:" + msg)
    switch (c) {
      case 400:
        Message.error(msg)
        break;
      case 401:
        Message.error('登录过期，请重新登录')
        break;
      // 404请求不存在
      case 404:
        Message.error('网络请求不存在')
        break;
      // 其他错误，直接抛出错误提示
      default:
        Message.error("系统错误")
    }
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }


}
export default HttpRequest
