<template>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>
</template>

<script>
import { getComment } from '@/API/comment'
export default {
  name: 'CommentList',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async   onLoad () {
      // 1 请求获取数据
      try {
        const { data } = await getComment({
          type: 'a',
          source: 'this.source',
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
      } catch (err) {

      }
      // 2 将数据请求到列表中
      // 3 将loading这只为false
      // 4 判断是否还有数据
      // 有就更新下一页的数据页码
      // 没有就将finished设置结束
    }
  }
}
</script>

<style lang="less" scoped>
.comment-list{
margin-bottom: 200px;
}
</style>
