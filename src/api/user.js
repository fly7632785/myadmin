import axios from '@/libs/api.request'

export const login = ({userName, password}) => {
  const data = {
    username: userName,
    password: password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    headers: {'token': token},
    method: 'post'
  })
}

export const getAllNowGps = (token) => {
  return axios.request({
    url: 'allNowGps',
    headers: {'token': token},
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    headers: {'token': token},
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}
