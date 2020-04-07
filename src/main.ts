import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './registerServiceWorker'

// 插件
import './plugins'

// 基础样式
import './assets/styles/global.scss'

// 测试使用 mockjs
import './mock'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
