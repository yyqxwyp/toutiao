import axios from '@/utils/request'
// import store from '@/store'
// 获取所有频道
export const getAllChannelsAPI = () => axios({
  url: '/v1_0/channels',
  method: 'get'
})
// axios内部，会把参数对象转成json字符串格式发给后台
// axios内部 会自动携带请求参数headers里 Content-Type：‘application/json'添加好
// 登录页面登录接口
export const loginAPI = data => axios({
  url: '/v1_0/authorizations',
  method: 'post',
  data
})

// 发送验证码的接口/v1_0/sms/codes/:mobile

export const sendSms = (mobile) => axios({
  url: `/v1_0/sms/codes/${mobile}`,
  method: 'get'
})
//
// 用户自己信息的获取

export const getUserInfo = () => axios({
  url: '/v1_0/user',
  method: 'get'
  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }

})

// 获取频道列表

export const getUserChannels = () => axios({
  url: '/v1_0/user/channels',
  method: 'get'
  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }

})

//   获取当前登录用户的个人资料

export const getUserProfile = target => axios({
  url: '/v1_0/user/profile',
  method: 'get'
  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }

})

//   修改用户信息
export const updateUserProfile = data => axios({
  url: '/v1_0/user/profile',
  method: 'patch',
  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
  data
})
