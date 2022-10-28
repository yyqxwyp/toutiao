import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 全局使用
//
import relativeTime from 'dayjs/plugin/relativeTime'
// import { values } from 'core-js/core/array'
// 配置使用处理相对时间的relativeTime 插件

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')
// const relativeTime = require('dayjs/plugin/relativeTime')

// 定义一个全局过滤器 ，然后就可以在任何组件的模板中使用
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方式：{{表达式|过滤器名称}}
// 管道符前面的表达式的结构会作为参数传递到过滤器函数中
Vue.filter('relativeTime', value => {
  return dayjs().to(value)
})
// dayjs默认语言是英文 我们配置成中文
