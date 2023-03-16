<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{tofixed(goods.goods_price)}}</view>
         <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref,reactive } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  const props = defineProps({
    goods:{
      type:Object,
      default:{}
    },
    showRadio:{
      type:Boolean,
      default:false
    },
    showNum:{
      type:Boolean,
      default:false
    }
  })
  const emit = defineEmits(['radio-click','num-change'])
  const defaultPic = ref('https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png')
  function tofixed(num){
    return Number(num).toFixed(2)
  }
  function radioClickHandler(){
    emit('radio-click',{
      goods_id:props.goods.goods_id,
      goods_state:!props.goods.goods_state
    })
  }
  function numChangeHandler(val){
      emit('num-change',{
      goods_id:props.goods.goods_id,
      goods_count:val
    }) 
  }
</script>

<style lang="scss">
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }
      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>