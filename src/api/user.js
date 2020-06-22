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

export const deleteUser = ({uid}, token) => {
  const data = {
    uid
  }
  return axios.request({
    url: 'delete_user',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    },
    data:Qs.stringify(data),
    method: 'post'
  })
}

export const createUserInfo = ({username,name, password,mobile,avatar}) => {
  const data = {
    username:username,
    name:name,
    password:password,
    mobile:mobile,
    avatar:avatar,
  }
  return axios.request({
    url: 'create_user',
    data:data,
    method: 'post'
  })
}

export const updateUserInfo = ({username,name, password,mobile,avatar},token) => {
  const data = {
    username:username,
    name:name,
    password:password,
    mobile:mobile,
    avatar:avatar,
  }
  return axios.request({
    url: 'update_user',
    headers: {'token': token},
    data:data,
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
