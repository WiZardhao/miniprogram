<template>
  <view>
    
  </view>
</template>

<script setup>
 import { onLoad,onShow } from '@dcloudio/uni-app'
 import { useBadge } from '../../utils/useBadge.js'
 onShow(()=>{
   useBadge()
 })
</script>

<style>

</style>
