<template>
  <div class="updata-name">
    <!-- 导航栏 -->
    <van-nav-bar title="设置昵称"  left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onUpdate"></van-nav-bar>
<!-- 输入框 -->
<div class="filed">
  <van-field
  v-model.trim="message"
  rows="2"
  autosize

  type="textarea"
  maxlength="7"
  placeholder="请输入昵称"
  show-word-limit
/>
</div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/API/index'
export default {
  name: 'updataName',
  data () {
    return {
      message: this.name
    }
  },
  props: {
    name: {
      type: undefined,
      required: true
    }
  },
  methods: {
    async onUpdate () {
      // console.log('111')
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        const { data } = await updateUserProfile({
          name: localName
        })
        // this.$emit('',)
        console.log(data)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.filed{
  padding: 20px;

}

</style>
