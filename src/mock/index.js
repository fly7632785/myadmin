import Mock from 'mockjs'
import { login } from './login'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 100
})

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)

export default Mock
