####项目介绍
. 移动端是一个it咨询移动web应用 有着和今日头条类似的咨询浏览体验
. 主要功能：资讯列表、标签页切换、文章居间、频道管理、文章详情、关注功能、点赞功能、评论功能、搜索功能、登陆功能、个人中心、编辑资料、小四同学
http://toutiao.itheima.net/api.html


优化本地存储
将本地存储封装到一个js文件中 在需要进行存储的时候直接调用方法就好了


数据的本地存储
token的存储
vuex中 方便获取 响应式的

添加请求拦截器 方便需要权限的数据接口可以直接使用
  // 因为父元素设置了flex布局 所以子元素设置宽高的时候不能生效  用下这个flex-shrink：0就可以设置了
  flex-shrink: 0;
  width: 30px;
height: 42px;


css3单位vw和vh 视口单位 根据浏览器窗口的大小的单位 不受父元素的影响

 fit="cover"使图片不被拉伸显示

处理时间的第三方库：
Moment.js
Day.js


获取关注取消关注的封装接口有问题
点赞和收藏也是404
文章评论接口也是404
文章详情页的图片获取也是404

父穿子：子组件propos接受 父组件动态传递


持久化没做
75-77
推荐频道的接口渲染没写
68-69

防抖：第三方包 lodash

防止获取文章详情的id错误的情况 第三方包：json-bigint


文档内容的基本样式 ：安装包github-markdown-css
$ npm install github-markdown-css
--legacy-peer-deps