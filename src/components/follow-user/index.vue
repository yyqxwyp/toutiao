<template>
  <div class="div">
    <van-button class="follow-btn" round size="small" v-if="isFollowed" @click="onFollow" :loading="loading">已关注</van-button>
<van-button class="follow-btn" type="info" v-else @click="onFollow" :loading="loading">关注</van-button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/API/channel'

export default {

  name: 'FollowUser',
  data () {
    return {
      loading: false
    }
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: 'true'
    }
  },
  methods: {
    async onFollow () {
      this.loading = true // 展示关注按钮的loading状态
      try {
        if (this.isFollowed) {
          // 已关注 取消关注
          await deleteFollow(this.userId)
          // console.log(data)
          // this.article.isFollowed = false
        } else {
          // 没有关注 关注
          await addFollow(this.userId)
          // console.log(data)
          // console.log('111')
          // this.article.isFollowed = true
        }
        this.article.isFollowed = !this.article.isFollowed
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        // 如果关注的是用户自己
        const message = '操作失败'
        if (err.response && err.response.status === 400) {
          // eslint-disable-next-line no-const-assign
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭按钮的loading状态
    }
  }
}
</script>

<style lang="less" scoped>
.div{
  .follow-btn{
  width: 100px;
  height: 30px;
  border-radius: 50px;
}
}

</style>
