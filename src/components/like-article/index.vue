<!-- eslint-disable no-const-assign -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <svg class="icon" aria-hidden="true" @click="onCollect">
    <use xlink:href="#icon-dianzan1" v-if="likeCollected===1" class="two"></use>
    <use xlink:href="#icon-dianzan" v-else></use>

      </svg>
</template>

<script>
import { addCollect, deleteCollect } from '@/API/article'
export default {
  name: 'LikeArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    likeCollected: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Object, String, Number],
      required: true
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        const status = -1
        if (this.likeCollected === 1) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
          // eslint-disable-next-line no-const-assign
          status = 1
        }
        this.$emit = ('likeCollected', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('点赞失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.icon{
  .two{
    fill: #e5645f;
  }
}

</style>
