<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- 头部的搜索框 -->
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed >
      <van-button slot="title" type="info" size="small" round icon="search" class="search-btn" to='/search'>
        搜索
      </van-button>
</van-nav-bar>

<!-- 频道列表 -->
<!--
  通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签
  animated 动画切换效果  swipeable 手势滑动切换页面
 -->
<van-tabs class="channel-tabs" v-model="active" animated swipeable  >
  <van-tab v-for="channel in channels" :key="channel.id"  :title='channel.name'>

    <!-- 文章列表 -->
  <article-list :channel="channel"></article-list>
  </van-tab>
  <div slot="nav-right" class="placeholder"></div>
<div slot="nav-right" class="hamm" @click="isChennelShow=true">
  <svg class="icon" aria-hidden="true" id="icon">
    <use xlink:href="#icon-toggle-right"></use>
</svg>
</div>
</van-tabs>

<!-- 频道编辑弹出层 -->
<van-popup
class=""
  v-model="isChennelShow"
  closeable
  position="bottom"
  :style="{ height: '100%' }"
  close-icon-position="top-left"
>
<ChannelEdit :mychannels="channels" :active="active" @updata-active='onUpdateActive'/>

</van-popup>
  </div>
</template>

<script>
import ChannelEdit from './components/channel-edit.vue'

import ArticleList from './components/article-list'
import { getUserChannels } from '@/API/index'
// import ArticleList from './components/article-list.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChennelShow: false// 控制编辑弹出层的显示状态

    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        // console.log(data)
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    onUpdateActive (index, isChennelShow = true) {
      console.log(index)
      this.active = index
      this.isChennelShow = isChennelShow
    }
  },
  components: {
    ArticleList,
    // ArticleList
    ChannelEdit

  }
}
</script>

<style lang="less" scoped>
.home-container{
padding-top: 80px;
  padding-bottom: 50px;
  /deep/.page-nav-bar{
  background-color: #3296fa;
  }
 /deep/ .van-nav-bar__title{
    max-width:unset;
  }

/deep/.search-btn{
width: 280px;
height: 30px;
background-color: #5babfb;
border:none;
font-size: 15px;
.van-button__icon{
font-size: 15px;
color: aliceblue;
}
}

/deep/.channel-tabs{
  // position: relative;
  .van-tabs__wrap{
    height: 40px;
    position: fixed;
    top: 40px;
    // 设置层级为最高层级显示
    z-index: 1;
    left: 0;
    right: 0;

  }
    .van-tab{
border-right: 1px solid #edeff3;
min-width: 70px;
font-size: 15px;
color: #777;
// min-height: 50px;
}
.van-tab--active{
  color:#333
}
.van-tabs__line{
  bottom: 20px;
  background-color: #3296fa;
  width: 50px !important;
  height: 4px;
}
.placeholder{
  // position: fixed;
  // left: ;
  // 因为父元素设置了flex布局 所以子元素设置宽高的时候不能生效  用下这个flex-shrink：0就可以设置了
  flex-shrink: 0;
  width: 30px;
height: 42px;
}
.hamm{
position: fixed;
right: 0;
width: 30px;
height: 42px;
display: flex;
justify-content: center;
align-items: center;
background-color: #fff;
opacity: .8;
.icon{
font-size: 20px;
  // color: #777;

}
// 利用伪元素给选项图标添加边框
&::before{
  content: '';
}
}
}

}
</style>
