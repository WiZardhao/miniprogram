<template>
 <view>
  <view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
    <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
  </view>
  <view class="address-info-box" v-else @click="chooseAddress">
    <view class="row1">
      <view class="row1-left">
        <view class="username">收货人：<text>{{address.username}}</text></view>
      </view>
      <view class="row1-right">
        <view class="phone">电话：<text>{{address.telNumber}}</text></view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <view class="row2">
      <view class="row2-left">收货地址：</view>
      <view class="row2-right">{{addStr}} </view>
    </view>
  </view>
  <image src="/static/cart_border@2x.png" class="address-border"></image>
 </view>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue'
  import { useStore } from 'vuex'
  const store = useStore()
  const address = computed(()=>{
    return store.state.m_user.address
  })
  const addStr = computed(()=>{
      return store.getters['m_user/addStr']
  })
  const chooseAddress = async ()=>{
     const [err, succ] = await uni.chooseAddress().catch(err => err)
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          store.commit('m_use/updateAddress',succ)
        }
        if (err && err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response') {
          this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
        }
  }
  const reAuth = async ()=>{
    const [err2, confirmResult] = await uni.showModal({
        content: '检测到您没打开地址权限，是否去设置打开？',
        confirmText: "确认",
        cancelText: "取消",
      })
      if (err2) return
      if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
      if (confirmResult.confirm) return uni.openSetting({
        success: (settingResult) => {
          if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
          if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
        }
      })
  }
</script>

<style lang="scss">
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}

// 选择收货地址的盒子
.address-choose-box {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 渲染收货信息的盒子
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;

  // 第一行
  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 5px;
      }
    }
  }

  // 第二行
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>