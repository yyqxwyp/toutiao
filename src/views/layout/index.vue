<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!--  -->
  <div class="layout-cpntainer">
    <!--子 路由出口 -->
    <router-view></router-view>
    <!-- 标签导航栏 -->
    <!-- route是开启路由模式 -->
    <van-tabbar  route>
  <van-tabbar-item to="/" icon="home-o">
    <!-- <i class="" slot="icon"></i> -->
    首页</van-tabbar-item>
  <van-tabbar-item icon="comment-o" to="/qa" >问答</van-tabbar-item>
  <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
  <van-tabbar-item icon="contact" to="/My">{{$store.state.user ? '我的' :'未登录'}}</van-tabbar-item>
</van-tabbar>
  </div>
  <!--子路由出口 -->
  <!-- <router-view></router-view> -->
  <!-- 标签导航栏 -->

</template>

<script>
export default {
  data () {
    return {
      // 开启路由模式的时候这个不会起作用
      // active: 0
    }
  }
}
</script>

<style>

</style>
