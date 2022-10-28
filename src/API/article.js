
/*
获取频道文章请求模块
 */

import axios from '@/utils/request'
//   /v1_0/articles
export const getArticles = (params) => axios({
  url: '/v1_0/articles',
  method: 'get',
  params
  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }

})

// 文章详情/v1_0/articles/:article_id
export const getArticleById = articleId => axios({
  url: `/v1_0/articles/${articleId}`,
  method: 'get'

  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }

})

// 文章收藏  /v1_0/article/collections
export const addCollect = target => axios({
  url: '/v1_0/article/collections',
  method: 'post',
  data: {
    target
  }

  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }

})

// 文章取消收藏  /v1_0/article/collections
export const deleteCollect = target => axios({
  url: `/v1_0/article/collections/${target}`,
  method: 'delete',
  data: {
    target
  }

  // 该接口需要授权才能使用
  // token的数据格式：Bear token 数据 注意后面跟拼接字符串
  // headers: {
  //   Authorization: `Bearer ${store.state.user.token}`
  // }

})
