<!-- eslint-disable vue/no-mutating-props -->
<!-- 频道编辑页的组件内容 -->
<template>
  <div class="channel-edit">
  <van-cell :border="false">
<div slot="title" class="title-text">我的频道</div>
    <div class="bianji" @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</div>
  </van-cell>
  <van-grid :gutter="10" class="my-grid">
  <!-- // eslint-disable-next-line vue/no-duplicate-attributes -->
  <van-grid-item v-for="(channel,index) in mychannels" :key="index" class="grid-item" @click="onMyChannelClick(channel,index)" >
    <van-icon name="clear" slot="icon" v-show="isEdit&&!fiexChannels.includes(channel.id)"></van-icon>
  <span slot="text" class="text" :class="{ active : index === active }">{{channel.name}}</span>
  </van-grid-item>
</van-grid>
<!-- 频道推荐 -->
<van-cell :border="false">
<div slot="title" class="title-text">频道推荐</div>
  </van-cell>
<van-grid :gutter="10" class="recommed">
  <van-grid-item v-for="(channel,index) in recommedChannels" :key="index" text="channels.name" class="grid-item" icon="plus"/>
</van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/API/channel'
// import { channel } from 'diagnostics_channel'
// import { create } from 'domain';
export default {
  // import {  } from "module";
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fiexChannels: [0]// 固定频道不允许删除
    }
  },
  props: {
    mychannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true

    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    onMyChannelClick (channel, index) {
      // eslint-disable-next-line no-undef
      // console.log(channel)
      // 如果编辑状态 执行删除频道
      if (this.isEdit) {
        // 1.如果是固定频道不能删除 固定频道不删除
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // 3.如果删除一个之后 索引减一
        // 编辑状态 执行删除状态
        // 参数1：要删除的元素索引  参数2：删除的个数
        if (index <= this.active) {
          // 让激活频道的index-1
          this.$emit('updata-active', this.active - 1, true)
        }
        // 2.删除频道项
        // eslint-disable-next-line vue/no-mutating-props
        this.mychannels.splice(index, 1)
      } else {
      // 非编辑切换频道状态
        this.$emit('updata-active', index, false)
      }
    },
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    }
  },
  // 计算属性 计算频道推荐里面的内容 用 所有频道-我的频道
  computed: {
    // recommedChannels () {
    //   return this.allChannels.filter(channel => {
    //     return !this.mychannels.find(myChannel => {
    //       return myChannel.id === channel.id
    //     })
    //   })
    // }
    recommedChannels () {
      const channel = []
      this.allChannels.forEach(channels => {
        // find遍历数组 找到满足条件的元素项
        const ret = this.mychannels.find(mychannel => {
          return mychannel.id === channel.id
        })
        // 如果我的频道中 不包括该频道项目 则收集到推荐频道中
        if (!ret) {
          channels.push(channel)
        }
      })
      // 把计算结果返回
      return channel
    }
  }

}
</script>

<style lang="less" scoped>
.channel-edit{
padding: 50px 0;
position: relative;
.bianji{
position: absolute;
  width: 60px;
  height: 22px;
  font-size: 15px;
  border: 1px solid red;
  right: 0;
  border-radius: 40% 40%;
  color: red;
}
.title-text{
  font-size: 18px;
  color: #333;
}
/deep/ .grid-item{
  width: 100px;
  height: 60px;
  .van-grid-item__content{
    // 让文字不折行显示在一行内
    white-space: nowrap;
  background-color: #f4f5f6 ;
.van-grid-item__icon-wrapper{
position: unset;
}
  .van-grid-item__text,.text{
    color: #222;
  font-size: 14px;
    margin-top: 0;

}
.active{
  color:red;
}
}

}
/deep/.my-grid{
  .van-icon-clear{
      position: absolute;
      right: 0;
      top: 0;
      font-size: 15px;
      color: #cacaca;
      z-index: 2;
    }
}

/deep/ .recommed{
  .grid-item{

    .van-grid-item__content{
      flex-direction: row;
      .van-icon-plus{
        margin-left: 6px;
        font-size: 15px;

      }
    }
  }
}

}
</style>>
