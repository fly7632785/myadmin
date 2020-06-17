import axios from '@/libs/api.request'
import Qs from 'qs'

export const login = ({username, password}) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: 'login',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data:Qs.stringify(data),
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
export const getAllUsers = (token) => {
  return axios.request({
    url: 'getusers',
    headers: {'token': token},
    method: 'get'
  })
}
export const getGpsHis = ({uid, from, to}, token) => {

  const data = {
    uid: uid,
    from: from,
    to: to
  }
  return axios.request({
    url: 'gpsHis',
    data: data,
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
