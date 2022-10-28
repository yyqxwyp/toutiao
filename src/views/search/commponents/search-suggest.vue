<template>
  <div class="search-suggest">
<ul class="list">
  <li v-for="(text,index) in suggestions" :key="index" @click="$emit('search',text)">
    <div class="left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-RectangleCopy1"></use>
      </svg>
    </div>
    <span v-html="highLight(text)"></span>
  </li>

</ul>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSearchSuggest } from '@/API/search'
export default {
  name: 'SearchSuggest',
  props: {
    SearchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []

    }
  },
  watch: {
    SearchText: {
      // 当文本框输入的内容发生变化的时候 调用这个函数
      // handler (value) {
      //   // console.log(value)/''
      //   this.loadSearchSuggest(value)
      // },
      // debounce两个参数 第一个参数:函数  第二个函数:延迟时间 单位毫秒
      // 返回值:防抖之后的函数
      handler: debounce(function (value) {
        // console.log(value)
        this.loadSearchSuggest(value)
      }, 1000),
      // 菜输入的时候也要获取数据
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggest (q) {
      try {
        const { data } = await getSearchSuggest(q)
        console.log(data)
        this.suggestions = data.data.options
      } catch (err) {
        console.log('数据获取失败')
      }
    },
    highLight (text) {
      // eslint-disable-next-line no-template-curly-in-string
      const highLightStr = `<span class=active>${this.SearchText}</span>`
      // eslint-disable-next-line no-template-curly-in-string
      // 正则表达式中间的内容 都会被当作匹配字符来使用 而不是数据变量
      // 如果需要根据数据变量动态创建 正则表达式 则手动new RegExp
      // 参数一 匹配模式字符串 他会更具这个字符串创建正则对象
      // 参数2 匹配模式 要写到字符串中
      const reg = new RegExp(this.SearchText, 'gi')
      return text.replace(reg, highLightStr)
    }

  }
}
</script >

<style lang="less" scoped>
.search-suggest{
  /deep/span.active{
  color:#3296fa
  }
 .list{
  li{
  background-color: rgb(119, 119, 120);
  padding: 8px 10px;
  display: flex;
  font-size: 15px;
  span{
    flex: 1;

  }
  .left{
  .icon{
     width: 20px;
     height: 20px;
     fill: rgb(79, 80, 81);
    }
  }
}
 }
}
</style>
