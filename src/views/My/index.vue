<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="my-container">
        <!-- 登陆成功的页面显示 -->
        <div class="header user-info" v-if="user">
      <!-- 个人信息部分 -->
<div class="bass-info">
<div class="left">
  <van-image
round
fit="cover"
  class="avatar"
:src="UserInfo.photo"
/>
<span class="name">{{UserInfo.name}}</span>
</div>
<div class="right">
  <van-button size="mini" round to="/user/profile">编辑资料</van-button>
</div>
</div>
<!-- 数量部分 -->
  <div class="data-stats">
    <div class="data-item">
      <span class="count">{{UserInfo.art_count}}</span>
      <span class="text">头条</span>
    </div>
    <div class="data-item">
      <span class="count">{{UserInfo.follow_count}}</span>
      <span class="text">关注</span>
    </div>
    <div class="data-item">
      <span class="count">{{UserInfo.fans_count}}</span>
      <span class="text">粉丝</span>
    </div>
    <div class="data-item">
      <span class="count">{{UserInfo.like_count}}</span>
      <span class="text">获赞</span>
    </div>

  </div>
    </div>
    <!-- 未登录的页面显示 -->
    <div class="header not-login" v-else>
<div class="login-btn" @click="$router.push('/login')">
  <img src="~@/assets/png.png" alt="" class="mobile-img">
  <span class="text">登陆 / 注册</span>
</div>
    </div>

    <!-- 导航 -->
 <div class="conta">
<div class="icon-item">
 <!-- <i class="iconfont icon-shoucang"></i> -->
 <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-shoucang"></use>
</svg>
      <span>收藏</span>
</div>
<div class="icon-item">
  <svg class="icon" aria-hidden="true" id="icon">
    <use xlink:href="#icon-shijian"></use>
</svg>
      <span>历史</span>
</div>
 </div>
    <!-- 导航 -->

    <!-- 退出登录部分 -->
  <div class="footer">
    <div class="top">
      <ul >
        <li class="list">
          <span class="text">消息通知</span>
          <svg class="icon" aria-hidden="true" id="icon">
    <use xlink:href="#icon-shijian"></use>
</svg>
        </li>

        <li class="list">
          <span class="text">小智同学</span>
          <svg class="icon" aria-hidden="true" id="icon">
    <use xlink:href="#icon-shijian"></use>
</svg>
        </li>
      </ul>
    </div>
    <div class="bottom" v-if="user" @click="onLogin">退出登录</div>
  </div>
  </div>
</template>

<script>
// import { component } from 'vue/types/umd'
import { mapState } from 'vuex'
import { getUserInfo } from '@/API/index'
export default {
  name: 'MyIndex',
  data () {
    return {
      UserInfo: {}// 用户信息
    }
  },
  created () {
    if (this.user) {
      // 如果用户登录了 则请求加载用户信息数据
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogin () {
      // console.log('注册')
      // 退出提示
      // 在组建中需要使用this.$dialog来调用弹窗框组件
      // eslint-disable-next-line no-undef
      this.$dialog.confirm({
        title: '确认退出码'
      })
        .then(() => {
          // on confirm
          // console.log('确认执行这里')
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
      // 确认退出 清楚登录状态（容器中的user+本地存储的user）
    },
    async  loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败 请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container{
  // background-color: rgb(181, 178, 178);
  .header{
    height: 180px;
    background-color: blue;
    // 在css中要使用@ 必须在前面加一个~
    // background:url('')
    // 使图片完全缩放到页面当中
    background-size: cover;

  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
display: flex;
justify-content: center;
align-content: center;
// 垂直排列
flex-direction: column;
.mobile-img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 14px;
}
.text{
  font-size: 20px;
  color:#fff

}
}
  }
  .user-info{
    .bass-info{
      border-top: 1px solid #000;
height: 110px;
// background-color: pink;
padding: 50px 15px 18px;
// 设置padding之后会把盒子撑开 设置这个之后就不用重新计算盒子的大小了
box-sizing: border-box;
display: flex;
justify-content: space-between;
align-items: center;
.left{
  display: flex;
  align-items: center;
  .avatar{
    width: 75px;
    height: 75px;
  border: 1px solid #fff;

  }
  .name{
    color: #fff;
    font-size: 15px;
    margin-left: 15px;

  }
}
    }
    .data-stats{
      border-top: 1px solid #000;
// height: 90px;
// background-color: green;
display: flex;
.data-item{
  flex: 1;
// 水平垂直居中
height: 90px;
display: flex;
justify-content: center;
align-items: center;
// 使用
// 里面的内容垂直
flex-direction: column;
color: #fff;

.count{
  font-size: 20px;
}
.text{
  font-size: 15px;
}
}
    }
  }
  .conta{
display: flex;
cursor: default;
.icon-item{
display: flex;
  flex: 1;
  justify-content: center;
align-items: center;
flex-direction: column;
height: 60px;
font-size: 15px;
.icon{
  margin-bottom: 5px;
  width: 30px;
  height: 30px;
  fill:#eb5253;
}
#icon{
  fill: #000;
}
}
  }
  // 底部样式
  .footer{
    .icon{
      width: 20px;
      height: 20px;

    }
    .top{
      .list{
        display: flex;
        margin: 20px 10px;
      }
    .text{
      font-size: 15px;
      flex: 1;

    }

    }
    .bottom{
      color:#eb5253;
      text-align: center;
      font-size:15px ;

    }
  }
}
</style>
