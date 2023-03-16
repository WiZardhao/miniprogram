<template>
<view class="cart-container" v-if="cart.length !== 0">
  <my-address></my-address>
  <view class="cart-title" >
    <!-- 左侧的图标 -->
    <uni-icons type="shop" size="18"></uni-icons>
    <!-- 描述文本 -->
    <text class="cart-title-text">购物车</text>
  </view>
  <uni-swipe-action>
    <block v-for="(goods, i) in cart" :key="i">
      <uni-swipe-action-item :right-options="options" @click="swipeActionHandler(goods)">
        <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-click="radioClickHandler" @num-change="numChangeHandler"></my-goods>
      </uni-swipe-action-item>
    </block>
  </uni-swipe-action>
  <my-settle></my-settle>
</view>
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script setup>
 import { ref,reactive,computed } from 'vue'
 import { useStore } from 'vuex'
 import { onLoad,onShow } from '@dcloudio/uni-app'
 import { useBadge } from '../../utils/useBadge.js'

 const store = useStore()
 const options = reactive([{
         text: '删除', 
         style: {
           backgroundColor: '#C00000' 
         }
       }
   ])
 const cart = computed(()=>{
   return store.state.m_cart.cart
 })
 const total = computed(()=>{
   return store.getters['m_cart/total']
 })
 onShow(()=>{
   useBadge()
 })
 function radioClickHandler(e){
   store.commit('m_cart/updateGoodsState',e)
 }
 function numChangeHandler(e){
   store.commit('m_cart/updateGoodsCount',e)
   uni.setTabBarBadge({
     index:2,
     text:total.value+" "
   }) 
 }
 function swipeActionHandler(e){
   store.commit('m_cart/removeGoodsById',e.goods_id)
   uni.setTabBarBadge({
     index:2,
     text:total.value+" "
   }) 
 }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
