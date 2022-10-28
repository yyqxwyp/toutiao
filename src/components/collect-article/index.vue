<!-- eslint-disable vue/no-multiple-template-root -->
<template>
 <svg class="icon" aria-hidden="true" @click="onCollect">
  <use xlink:href="#icon-favorite-filling" v-if="isCollected"  class="two"></use>
        <use xlink:href="#icon-mingxinghuodong" v-else></use>

      </svg>
      <!-- // eslint-disable-next-line vue/no-multiple-template-root -->

</template>

<script>
import { addCollect, deleteCollect } from '@/API/article'
// import { truncateSync } from 'fs'
export default {
  name: 'CollectArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Object, String, Number],
      required: true
    }
  },
  comments: {
    addCollect,
    deleteCollect
  },
  methods: {
    async   onCollect () {
      try {
        if (this.value) {
          // 已收藏 取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 没收藏 添加收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('update-is_followed', !this.isCollected)
        //
        this.$toast.success(this.isCollected ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast('操作失败请重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.icon{
  .two{
    fill: #ffa500;
  }
}
</style>
