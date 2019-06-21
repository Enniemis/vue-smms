import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'  //重置样式
import './assets/css/common.css' //公用样式
import ElementUI from 'element-ui'; // 引入JS组件
import 'element-ui/lib/theme-chalk/index.css'; // 引入css样式
import echarts from 'echarts'   //引入echarts
import axios from 'axios'  //引入axios
import qs from 'qs'
import local from '@/utils/local'  //本地储存封装
Vue.use( ElementUI ) // 注册
Vue.prototype.$echarts = echarts;
Vue.prototype.req = axios;
Vue.prototype.qs = qs;
// 路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  // 获取token
  const token = local.get('atom')

  // 判断
  if (token) {   // 如果有token 
    next() // 直接放行
  } else {
    if (to.path === '/login') { // 如果去的是登录 直接放行
      next() 
    } else {
      next({path: '/login'}) //  如果去的是其他页面，直接跳转到登录页面。
    }
  }
})
Vue.config.productionTip = false // 阻止生产提示

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
