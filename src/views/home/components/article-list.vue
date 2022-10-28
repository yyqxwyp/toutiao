<!-- 文章列表组件 -->
<template>
  <div class="aricle-list">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1500">
    <van-list
  v-model="loading"
  :finished="finished"  q
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  finished-text="没有更多了"
  @load="onLoad"
>
  <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
  <ArticleItem  v-for="(article,index) in list" :key="index" :article="article"></ArticleItem>
</van-list>

</van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getArticles } from '@/API/article'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem

  },

  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      list: [], // 存储数据
      loading: false, // 加载状态为结束
      finished: false, // 加载更多未完成
      timestamp: null,
      error: false, // 控制失败的提示状态
      isRefreshing: false, // 控制下拉刷新的loading状态
      refreshSuccessText: '刷新成功'// 下拉刷新成功提示文本
    }
  },
  methods: {
    // onLoad () {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
    async  onLoad () {
      try {
        // 1 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          // 请求数据的页码
          timestamp: this.timestamp || Date.now()
        })
        // console.log(data)
        const { results } = data.data
        // 数组的展开操作符 他会把数组元素一个一个拿出来
        this.list.push(...results)
        // /本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页的数据的事件戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据 将finished设置为true 不在load加载更多了
          this.finished = true
        }
      } catch (err) {
        // 请求失败
        this.error = true
        // 请求失败了 loading也需要关闭
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()// 下拉刷新每次请求获取最新数据

        })
        const { results } = data.data
        this.list.unshift(...data.data.results)
        this.isRefreshing = false
        // 更新下拉成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        // console.log('请求失败', err)
        this.isRefreshing = '刷新失败'
        this.refreshSuccessText = false
      }
      // 请求获取数据
      // 将数据列表的顶部
      // 关闭下拉刷新的loading状态
    }
  }
}
</script>

<style lang="less" scoped>
.aricle-list{
  overflow-y: auto;
  height: 90vh;
}

</style>
