<template>
  <div class="article-container">
    <!-- 头部 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- 导航栏 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical >加载中</van-loading>
      </div>
      <!-- 加载完成 -->
      <!-- 加载完成文章详情 -->
      <!-- // eslint-disable-next-line vue/valid-v-else-if -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>

        <!-- 用户信息 -->
<van-cell class="user-info" center :border="false">
<van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo"></van-image>
<div class="user-name" slot="title">{{article.aut_name}}</div>
<div class="publish-data" slot="label">{{article.pubdate | relativeTime }}</div>

<!-- 模板中的$event是事件参数 -->
<FollowUser :is-followed="article.is_followed" :user-id="article.aut_id" @update-is_followed="article.is_followed = $event"></FollowUser>
</van-cell>

      <!-- 文章内容 -->

      <div class="article-content markdown-body" v-html="article.content" ref="article-content"></div>
      <van-divider>正文结束</van-divider>

      <!-- 文章评论列表 -->
      <CommentList :source="article.art_id"></CommentList>

      <div class="article-button">
      <van-button class="comment-btn" type="default">
        写评论
      </van-button>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi"></use>
      </svg>

<CollectArticle class="icon" :isCollected="article.is_collected" :articleId="article.art_id" @update-is_followed="article.is_collected = $event"></CollectArticle>
      <!-- -->
<LikeArticle  :likeCollected="article.attitude" :articleId="article.art_id" ></LikeArticle>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
    </div>
      <!-- 加载失败 -->
      <div class="error-wrap" v-else-if="errStatus===404">
       <!--  -->
       <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-RectangleCopy2"></use>
      </svg>
          <p class="text">该资源不存在或删除</p>

      </div>

      <!--  加载失败其他未知错误-->
      <div class="error-wrap" v-else>
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-RectangleCopy2"></use>
      </svg>
          <p class="text">内容加载失败</p>
          <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>

      </div>
    </div>

    <!-- 底部区域 -->

  </div>
</template>

<script>
import 'github-markdown-css'
import { ImagePreview } from 'vant'
import { getArticleById } from '@/API/article'
import FollowUser from '../../components/follow-user/index.vue'
import CollectArticle from '@/components/collect-article/index.vue'
import LikeArticle from '@/components/like-article'
import CommentList from './comm/comment_list.vue'

// import { relative } from 'path'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      followLoading: false
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // 测试请求加载失败的代码
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsajkbcubibu')
        // }
        // console.log(data)
        // 数据驱动试图这件事 不是立即的
        this.article = data.data
        // 初始化图片点击预览
        // console.log(this.$refs['article-content'])
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          this.previewImage()
        }, 0)
        // 请求成功 关闭loading
        // this.loading = false
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log('获取数据失败')
        // this.loading = false
      }
      // 成功失败都要关闭loading
      this.loading = false
    },
    previewImage () {
      // 得到所有的img节点
      const articleConent = this.$refs['article-content']
      const imgs = articleConent.querySelectorAll('img')
      // console.log(imgs)
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        // 图片点击这有点问题 因为找不到图片的地址
        img.onClick = () => {
          ImagePreview({
            images,
            // 启示位置,从0开始
            startPosition: index
          })
          // console.log('111')
        }
      })
      // console.log(images)
    }
    // 文章详情页的关注取消

  },
  created () {
    this.loadArticle()
  },
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList
  }
}
</script>

<style lang="less" scoped>
// @import 'githup-markdown.css'
.article-container{
  position: relative;
  width: 375px;

  .page-nav-bar{
    width: 375px;
// margin-top: 10px;
padding-top: 5px;
    position: fixed;
  top: 0;
    background-color: blue;
  }
  /deep/.van-icon{
    color: #fff;
  }
  /deep/.van-nav-bar__title{
    color: #fff;
  }
  .loading-wrap{
    margin: 100px 0 ;
  }
  .article-detail{
    padding-top:50px;
    .article-content{
    // margin-left: 10px;/

      width: 375px;
      // height: 400px;
      img{
        width: 375px;
      }
    }

    .article-title{
      font-size: 18px;
    }
    .user-info{
      padding: unset;
      .avatar{
        width: 50px;
        height: 50px;
      }

    }
  }
  .error-wrap{
    text-align: center;
    margin-top: 200px;
    p{
      font-size: 18px;
      margin: 4px;
      color:rgb(129, 129, 129);
    }
    .icon{
      width: 100px;
      height: 100px;
      fill:rgb(129, 129, 129)
    }
    .retry-btn{
      color: rgb(129, 129, 129);
      width: 170px;
      height: 40px;
    }
  }
  .article-button{
    // margin-top: 50px;
  padding: 2px 10px;
    border-top: 1px solid #000;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 45px;
    background-color: #fff;
    .icon{
      // margin-top: 5px;
      width: 20px;
      height: 20px;
      padding-left: 40px;
    }
    .comment-btn{
      width: 100px;
      height: 25px;
    }
  }
}
</style>
