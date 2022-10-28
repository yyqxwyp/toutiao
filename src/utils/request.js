// 基于axios封装网络请求
import theAxios from 'axios'
import store from '@/store/index'
import JSONBig from 'json-bigint'

// const jsonStr='{'art_id'}'
// JSONBig两个方法 JSONBig.parse()把json格式的字符串 转化为js对象
// ....string 把对象转化成字符串
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000,
  // 自定义后端返会的原始数据
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      //
      return data
    }
    // axio莫仍在内部这样来处理后端返回的数据
    // return data
  }]
})

// 添加请求拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config配置对象 本次请求的请求配置对象
  // console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 务必要返回config配置对象 否则请求就定在这里出不去了
  console.log(config)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default ({ url, method = 'get', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
// 上面有局限性
