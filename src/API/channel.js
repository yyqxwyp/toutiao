/* 频道请求模块 */
import axios from '@/utils/request'

/* 获取所有频道列表 */
export const getAllChannels = () => axios({
  url: ' /v1_0/channels  ',
  method: 'get'
  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }

})

// 关注用户
export const addFollow = target => axios({
  url: ' /v1_0/user/followings  ',
  method: 'post',
  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   // eslint-disable-next-line no-undef
  //   Authorization: `Bearer ${store.state.user.token}`
  // },
  data: {
    target
  }
})

// 取消关注
// 关注用户
export const deletFollow = target => axios({
  url: `/v1_0/user/followings/${target}`,
  method: 'DELETE'
  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   // eslint-disable-next-line no-undef
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})
