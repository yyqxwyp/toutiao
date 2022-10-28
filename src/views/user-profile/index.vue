<template>
  <div class="user-profile">
    <!-- <\导航栏 -->
    <van-nav-bar title="个人信息" class="page-nav-bar" left-arrow  @click-left="$router.back(-1)"></van-nav-bar>
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image

  width="20"
  height="20"
  fit="cover"
  round
  :src="user.photo"
/>
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow=true"></van-cell>
    <van-cell title="性别" :value="user.gender===0?'男':'女'" is-link></van-cell>
    <van-cell title="生日" :value="user.birthday" is-link></van-cell>

    <!-- 编辑昵称的弹出层 -->
    <van-popup style="height:100%" v-model="isUpdateNameShow" position="bottom">
    <updataName @close="isUpdateNameShow=false" :name="user.name" v-if="isUpdateNameShow"></updataName>
    </van-popup>
  </div>

  <!--  -->
</template>

<script>
import { getUserProfile } from '@/API/index'
import updataName from './commponents/updata-name.vue'
// import { create } from 'domain'
export default {
  name: 'UserPro',
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.user = data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  },
  data () {
    return {
      user: {}, // 用户个人信息
      isUpdateNameShow: false
    }
  },
  created () {
    this.loadUserProfile()
  },
  components: {
    updataName
  }
}
</script>

<style lang="less" scoped>
/deep/.page-nav-bar{
  background-color: #3296fa;
.van-nav-bar__title{
  color:#fff
}
.van-icon{
  color:#fff
}

}
/deep/.van-popup {
  background-color: #f5f7f9;
}

</style>
