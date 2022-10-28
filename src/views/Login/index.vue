<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <van-nav-bar
    left-arrow
  title="登陆"
  class="page-nav-bar"
>
<van-icon  slot="left" name="cross" @click="$router.back()" class=""/>
</van-nav-bar>
<!-- van-field 表示输入框 -->
<!-- van-form表单元素 -->
<!-- name=''里面的名字会被表单收集起来传给服务器
rules 属性适配规则  :属性名=‘表达式’ 属性值=‘字符串’
  required表示必填项
-->
<div>
  <van-form @submit="onSubmit" ref="loginForm">
  <van-field
  required
    v-model="user.mobile"
    type="Number"
    name="mobile"
    label="手机号"
    placeholder="请输入11位手机号"
    :rules="[{ required: true, message: '请填写手机号',pattern:/^1[3456789]\d{9}$/ }]"
    maxlength="11"
  />
  <van-field
  required
    v-model="user.code"
    type="Number"
    name="code"
    label="密码"
    placeholder="请输入6位密码"
    :rules="[{ required: true, message: '请填写密码',pattern:/^\d{6}$/ }]"
    maxlength="6"
  >
  <template #button>
    <!-- time倒计时事件 -->
    <van-count-down :time="1000*60"  format="ss s" v-if="isCountDownShow" @finish='isCountDownShow=false'/>
    <van-button round size="small" type="default" class="sendbtn" @click="onSendSms" native-type="button" v-else>发送验证码</van-button>
  </template>
</van-field>

  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
</div>
  </div>
</template>

<script>
import { loginAPI, sendSms } from '@/API/index'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''// 密码必须是246810
      },
      isCountDownShow: false// 是否显示倒计时

    }
  },
  methods: {
    // 结构异步操作的代码
    async onSubmit (values) {
      console.log('submit', values)
      // 1.获取表单数据

      // 2表单验证
      // 在组件中必须通过this.$toast来调用toast组件
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0// 持续展示
      })
      // 3 提交表单请求登录
      const { data } = await loginAPI(this.user)
      // console.log(res, '登录成功')
      this.$store.commit('setUser', data.data)
      this.$toast.success('登录成功')
      // 4根据请求响应结果处理后的问题
      // 登录成功页面跳转回原来的页面
      this.$router.back()
    },
    async  onSendSms () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        // console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 验证通过显示倒计时
      this.isCountDownShow = 'true'

      // 请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        console.log(res)
      } catch (err) {
        // console.log('发送失败')
        this.isCountDownShow = false
        if (err.axios.status === 429) {
          this.$toast('发送频繁 稍后重试')
        } else {
          this.$toast('发送失败稍后重试')
        }
      }
    }
  }
}
</script>
<!--  lang="less"当前标签内使用的是less语法 -->
<style lang="less" scoped>
// .van-nav-bar{
//   // background-color: #007bff ;
// }
// 此标签选择器的名字是van-nav-bar组件内标签scoped尝试吧此选择器后属性选择器匹配当前页面标签（选不中组件内部的标签）
// 解决这个问题可以在属性前面加一个/deep/，会把属性选择器加到前面
// 修改组件内的样式 要在选择器前面加/deep/
// /deep/.van-nav-bar__title{
// // color: aliceblue;
// }
.sendbtn{
  background-color: #ededed;
}
.van-icon{
  color:#fff
}
/deep/.page-nav-bar{
  background-color: #3296fa;
.van-nav-bar__title{
  color:#fff
}
.van-icon{
  color:#fff
}
}
</style>
