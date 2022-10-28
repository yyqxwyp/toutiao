//  /v1_0/suggestion
import axios from '@/utils/request'
export const getSearchSuggest = (q) => axios({
  url: '/v1_0/suggestion',
  method: 'get',
  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
  params: {
    q
  }
})

//  /v1_0/search搜索结果获取
export const getSearchResult = params => axios({
  url: '/v1_0/search',
  method: 'get',
  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
  params
})
