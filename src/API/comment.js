/* 评论请求模块 */
import axios from '@/utils/request'
export const getComment = params => axios({
  url: ' /v1_0/comments',
  method: 'get',
  params

})
