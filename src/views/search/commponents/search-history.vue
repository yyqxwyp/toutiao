<template>
  <div class="search-history">
<ul class="list">
  <li class="one">

  <span class="search">搜索历史</span>
<div class="right">
  <span class="text">全部删除</span>
  <span class="text">完成</span>

<!-- <van-button icon="delete" class="icon"> </van-button> -->
<svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-ashbin"></use>
      </svg>
</div>
  </li>
  <li><span>1</span>
   <div class="right">
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-delete-filling"></use>
      </svg>
   </div>
  </li>
  <li><span>1</span>
   <div class="right">
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-delete-filling"></use>
      </svg>
   </div>

  </li>
  <li><span>1</span>
   <div class="right">
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-delete-filling"></use>
      </svg>
   </div>

  </li>
  <li><span>1</span>
   <div class="right">
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-delete-filling"></use>
      </svg>
   </div>

  </li>
</ul>

  </div>
</template>

<script>
export default {
  name: 'SearchHistory'
}
</script>

<style lang="less" scoped>

.search-history{
  width: 100%;
// display: flex;
.list{

li{
  background-color: rgb(119, 119, 120);
  padding: 8px 10px;
  display: flex;
  font-size: 15px;
  span{
    flex: 1;

  }
  .right{
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
