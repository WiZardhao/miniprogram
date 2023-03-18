<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  const store = useStore()
  const redirectInfo = computed(()=>{
    return store.state.m_user.redirectInfo
  })
  const getUserProfile = async ()=>{
    const res = await uni.getUserProfile({
      desc:'登录授权'
    }).catch(err=>err)
    console.log('getuserinfo',res)
    if(res.errMsg.search(/fail/g) !== -1){
      return uni.$showToast('请重新进行授权！')
    }
    store.commit('m_user/updateUserInfo',res.userInfo)
    getToken(res)
  }
  const getToken = async (info)=> {
    const res = await uni.login().catch(err => err)
    console.log('token',res)
    if(res.errMsg.search(/fail/g) !== -1){
      return uni.$showToast('登录失败')
    }
    const query = {
      code: res.code,
      encryptedData: info.encryptedData,
      iv: info.iv,
      rawData: info.rawData,
      signature: info.signature
    }
  
    const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
    if (!(loginResult.meta.status === 200 || loginResult.meta.status === 400)) return uni.$showToast('登录失败！')
    uni.$showToast('登录成功')
    console.log(loginResult)
    const msg = loginResult.message || {}
    if(loginResult.meta.status === 400){
      for(let i = 1;i<=32;i++){
        const n = Math.floor(Math.random()*16).toString(16)
        msg.token += n
      }
    }
    store.commit('m_user/updateToken',msg.token)
    navigateBack()
  }
  function navigateBack() {
  // redirectInfo 不为 null，并且导航方式为 switchTab
  if (redirectInfo && redirectInfo.openType === 'switchTab') {
    // 调用小程序提供的 uni.switchTab() API 进行页面的导航
    uni.switchTab({
      // 要导航到的页面地址
      url: redirectInfo.from,
      // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
      complete: () => {
        store.commit('m_user/updateRedirectInfo',null)
      }
    })
  }
}
</script>

<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>