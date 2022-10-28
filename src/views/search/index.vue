<template>
<div class="search-container">
<!-- 搜索栏 -->

  <form action="/" class="searchfrom">
  <van-search
    v-model="SearchText"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    background="#3296fa"
    @focus="isResultShow=false"
  />
</form>

<!-- 历史结果 -->
<SearchResult
 v-if="isResultShow"
:search-text="SearchText"

 ></SearchResult>
<!-- 联想建议 -->
<SearchSuggest
v-else-if="SearchText"
:search-text="SearchText"
@search="onSearch"
></SearchSuggest>
<!-- 搜索历史记录 -->
<SearchHistory v-else></SearchHistory>
</div>
</template>

<script>
// import { Toast } from 'vant'
import SearchHistory from './commponents/search-history.vue'
import SearchResult from './commponents/search-result.vue'
import SearchSuggest from './commponents/search-suggest.vue'
export default {
  name: 'SearchIndex',
  data () {
    return {
      SearchText: '',
      isResultShow: false// 控制搜索结果的展示
    }
  },
  methods: {
    onSearch (val) {
      // Toast(val)
      this.SearchText = val
      // console.log(val)
      this.isResultShow = true
    },
    onCancel () {
      // Toast('取消')
    }
  },
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  }
}
</script>

<style lang="less" scoped>
.search-container{
  padding-top: 50px;
  .van-search__action{
  color: #fff;
}
.searchfrom{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
}

</style>
