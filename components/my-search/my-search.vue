<template>
   <view class="my-search-container" :style="{'background-color':bgcolor}">
      <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler">
        <uni-icons type="search" size="17"></uni-icons>
        <text class="placeholder">搜索</text>
      </view>
    </view>
</template>

<script setup>
 defineProps({
   bgcolor: {
      type: String,
      default: '#C00000'
    },
    radius: {
      type: Number,
      default: 18
    }
 })
 const emit = defineEmits(['searchClick'])
 function searchBoxHandler(){
   emit('searchClick')
 }
</script>

<style lang="scss">
.my-search-container {
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.my-search-box {
  height: 36px;
  background-color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .placeholder {
    font-size: 15px;
    margin-left: 5px;
  }
}
</style>