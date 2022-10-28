<template>
  <div>
    <router-view></router-view>

  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/API'
// try+catch来捕获await同步代码的错误
export default {
  async created () {
    try {
      const res = await getAllChannelsAPI()
      console.log(res)
    } catch (err) {
      // err参数拿到的就是错误对象
      // 给用户来一个弹窗提示
      // console.dir(err)详细打印
      console.dir(err)
    }
  }
}
</script>

<style lang="less" scoped>
.page-nav-bar{
  background-color: pink;
}
</style>
