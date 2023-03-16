<template>
  <view class="search-box">
    <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
  </view>
  <view class="sugg-list" v-if="searchResults.length !== 0">
    <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
      <view class="goods-name">{{item.goods_name}}</view>
      <uni-icons type="arrowright" size="16"></uni-icons>
    </view>
  </view>
  <view class="history-box" v-else>
    <!-- 标题区域 -->
    <view class="history-title">
      <text>搜索历史</text>
      <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
    </view>
    <!-- 列表区域 -->
    <view class="history-list">
      <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
    </view>
  </view>
</template>

<script setup>
  import { ref,computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  const timer = ref(null)
  const keywords = ref('')
  const searchResults = ref([])
  const historyList = ref(['a','app','app'])
    
  const historys = computed(()=>{
    return [...historyList.value].reverse()
  })
    
  onLoad(()=>{
   historyList.value = JSON.parse(uni.getStorageSync('keywords') || '[]')
  })
  function input(e){
    clearTimeout(timer.value)
    timer.value = setTimeout(()=>{
      keywords.value = e
      getSearchList()
    },500)
  }
  function gotoDetail(goods_id) {
      uni.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
      })
    }
    
  function saveSearchHistory(){
    const set = new Set(historyList.value)
    set.delete(keywords.value)
    set.add(keywords.value)
    historyList.value = Array.from(set)
    uni.setStorageSync('keywords',JSON.stringify(historyList.value))
  }
  function cleanHistory() {
  historyList.value = []
  uni.setStorageSync('keywords', '[]')
}
  function gotoGoodsList(kw) {
  uni.navigateTo({
    url: '/subpkg/goods_list/goods_list?query=' + kw
  })
}
  const getSearchList = async ()=>{
     if (keywords.value === '') {
        searchResults.value = []
        return
      }
      const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: keywords.value })
      if (res.meta.status !== 200) return uni.$showToast()
      searchResults.value = res.message
      saveSearchHistory()
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
