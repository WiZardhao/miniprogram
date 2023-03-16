<template>
    <view class="goods-list">
        <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
          <my-goods :goods='item'></my-goods>
        </view>
    </view>
</template>

<script setup>
  import { ref,reactive } from 'vue'
  import { onLoad,onReachBottom,onPullDownRefresh } from '@dcloudio/uni-app'
  const goodsList = ref([])
  const total = ref(0)
  const isLoading = ref(false)
  const queryObj = reactive({
    query:'',
    cid:'',
    pageNum:1,
    pageSize:10
  })
    
  onLoad((options)=>{
    queryObj.query = options.query || ''
    queryObj.cid = options.cid || ''
    getGoodsList()
  })
  
  onReachBottom(()=>{
    if(queryObj.pageNum*queryObj.pageSize >= total.value){
      uni.$showToast('数据加载完毕!')
      return
    }
    if(isLoading.value) return;
    queryObj.pageNum+=1
    getGoodsList()
  })
  
  onPullDownRefresh(()=>{
    queryObj.pageNum=1
    total.value = 0
    isLoading.value = false
    goodsList.value = []
    getGoodsList(()=>uni.stopPullDownRefresh())
  })
  function gotoDetail(item) {
    uni.navigateTo({
      url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
    })
  }
  const getGoodsList = async (callback)=>{
    isLoading.value = true
    const { data: res } = await uni.$http.get('/api/public/v1/goods/search', queryObj)
    isLoading.value = false
    callback && callback()
    if (res.meta.status !== 200) return uni.$showMsg()
    goodsList.value = [...goodsList.value,...res.message.goods]
    total.value = res.message.total
  }
</script>

<style lang="scss">
</style>
