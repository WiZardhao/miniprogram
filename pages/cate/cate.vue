<template>
  <my-search @searchClick='gotoSearch'></my-search>
  <view>
      <view class="scroll-view-container">
       <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
         <block v-for="(item, i) in cateList" :key="i">
           <view :class="['left-scroll-view-item',i===active?'active':'']" @click="activeChanged(i)">{{item.cat_name}}</view>
         </block>
       </scroll-view>
       <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
         <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
           <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
            <view class="cate-lv3-list">
                 <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
                   <image :src="item3.cat_icon"></image>
                   <text>{{item3.cat_name}}</text>
                 </view>
               </view>
         </view>
       </scroll-view>
      </view>
  </view>
</template>

<script setup>
   import { ref } from 'vue'
   import { onLoad,onShow } from '@dcloudio/uni-app'
   import { useBadge } from '../../utils/useBadge.js'
   const wh = ref(0)
   const cateList = ref([])
   const cateLevel2 = ref([])
   const active = ref(0)
   const scrollTop = ref(0)
   onLoad(()=>{
     const sysInfo = uni.getSystemInfoSync()
     wh.value = sysInfo.windowHeight - 50
     getCateList()
   })
   onShow(()=>{
     useBadge()
   })
   const getCateList = async () => {
       const { data: res } = await uni.$http.get('/api/public/v1/categories')
           if (res.meta.status !== 200) {
              return uni.$showToast()
            }
           cateList.value = res.message
           cateLevel2.value = res.message[0].children
    }
    function activeChanged(i){
      active.value = i
      cateLevel2.value = cateList.value[i].children
      scrollTop.value = scrollTop.value? 0 : 1
    }
    function gotoGoodsList(item){
        uni.navigateTo({
           url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
         })
    }
    function gotoSearch(){
        uni.navigateTo({
             url: '/subpkg/search/search'
           })
    }
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
</style>
