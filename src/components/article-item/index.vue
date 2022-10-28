<template>
  <!-- :to='`/article/${article.art_id}`' -->
  <!-- :to='{
    //根据路由名称进行跳转
    name:'article',
    //传递路由动态参数
    pararms:{
      //属性名:动态参数名称
      articleId:article.art_id
    }
  }'' -->
    <van-cell title="单元格" class="article-item" :to="'/article/'+article.art_id"
   >
   <div slot="title" class="title">{{article.title}}</div>

   <div slot="label">
   <div class="cover-wrap" v-if="article.cover.type===3">
<!-- // eslint-disable-next-line vue/require-v-for-key -->
<div class="cover-item" v-for="(img,index) in article.cover.images" :key="index">
  <van-image
  fit="cover"
class="cover-img"
  :src="img"
/>
</div>

   </div>
    <div class="label-info-wrap">
      <span>{{article.aut_name}}</span>
      <span>{{article.comm_count}}评论</span>
      <span>{{article.pubdate | relativeTime}}</span>

    </div>
   </div>
   <!-- 右边图片 -->
   <van-image slot="default"
  fit="cover"

   v-if="article.cover.type===1"
class="right-cover"
  :src="article.cover.images[0]"
/>

  </van-cell>

</template>

<script>
// import { relative } from 'path'

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.article-item{
  .title{
    font-size: 15px;
    color: #3a3a3a;
  }
  .van-cell__value{
padding-left: 15px;

flex: unset;
width: 120px;
height: 120px;
  }
  .right-cover{
    width: 120px;
height: 120px;
  }
  .label-info-wrap span{
font-size: 12px;
color: #b4b4b4;
margin-right: 12px;
  }
  .cover-wrap{
    display: flex;
  .cover-item{
    flex: 1;
    height: 100px;
    &:not(:last-child){
padding-right: 4px;
    }
    .cover-img{
width: 100%;
height: 100px;

    }
  }
  }
}
</style>
