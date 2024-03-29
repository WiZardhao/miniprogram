
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import Store from './store/store.js'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Store)
  return {
    app
  }
}
// #endif
  
uni.$showToast = function(title="数据加载出错!",duration=1500){
   uni.showToast({
     title,
     duration,
     icon:'none',
   })
}
//导入网络请求模块
import { $http } from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
  if (options.url.indexOf('/my/') !== -1) {
      // 为请求头添加身份认证字段
      options.header = {
        // 字段的值可以直接从 vuex 中进行获取
        Authorization: Store.state.m_user.token,
      }
    }
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}