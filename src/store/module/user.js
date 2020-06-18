import {
  login,
  getUserInfo,
  getUnreadCount,
  getAllNowGps,
  getAllUsers,
  getGpsHis,
  logout,
} from '@/api/user'
import {setToken, getToken,getAvatar,setAvatar,getName,setName,getUsername,setUsername,getUid,setUid} from "@/libs/util";

export default {
  state: {
    userName: getUsername(),
    name: getName(),
    userId: getUid(),
    avatarImgPath: getAvatar(),
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvatar(state, avatarPath) {
      state.avatarImgPath = avatarPath
      setAvatar(avatarPath)
    },
    setUserId(state, id) {
      state.userId = id
      setUid(id)
    },
    setName(state, name) {
      state.name = name
      setName(name)
    },
    setUserName(state, name) {
      state.userName = name
      setUsername(name)
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
    setMessageCount(state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore(state, {msg_id, content}) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg(state, {from, to, msg_id}) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  actions: {
    // 登录
    handleLogin({commit}, {userName, password}) {
      const username = userName.trim()
      console.log('username:',username)
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {
          const data = res
          console.log(data)
          commit('setToken', data.token)
          resolve()
        }).catch(err => {
          console.log("login error:" + JSON.stringify(err))
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut({state, commit}) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAvatar', '')
        commit('setName', '')
        commit('setUserId', '')
        commit('setUserName', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo({state, commit}) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(data => {
            commit('setAvatar', data.avatar)
            commit('setUserName', data.username)
            commit('setUserId', data.uid)
            commit('setName', data.name)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },

    //获取所有人的实时定位
    getAllNowGps({state}) {
      return new Promise((resolve, reject) => {
        try {
          getAllNowGps(state.token).then(data => {
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },

    //获取所有人的实时定位
    getAllUsers({state}) {
      return new Promise((resolve, reject) => {
        try {
          getAllUsers(state.token).then(data => {
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    //获取历史轨迹
    getGpsHis({state}, {uid, from, to}) {
      return new Promise((resolve, reject) => {
        try {
          console.log('from：',from)
          console.log('to：',to)
          getGpsHis({uid, from, to}, state.token).then(data => {
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },

    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount({state, commit}) {
      getUnreadCount().then(res => {
        const {data} = res
        commit('setMessageCount', data)
      })
    },
  }
}
