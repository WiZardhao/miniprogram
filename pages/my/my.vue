<template>
    <view class="my-container">
  
      <!-- 用户未登录时，显示登录组件 -->
      <my-login v-if="!token"></my-login>
  
      <!-- 用户登录后，显示用户信息组件 -->
      <my-userinfo v-else></my-userinfo>
  
    </view>
</template>

<script setup>
 import { computed } from 'vue'
 import { useStore } from 'vuex'
 import { onLoad,onShow } from '@dcloudio/uni-app'
 import { useBadge } from '../../utils/useBadge.js'
 onShow(()=>{
   useBadge()
 })
 const store = useStore()
 const token = computed(()=>{
   return store.state.m_user.token
 })
</script>

<style lang="scss">
.my-container{
  height:100%;
}
</style>
