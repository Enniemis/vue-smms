import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('./views/login/login.vue')
    },
    {
      path: '/home',
      component: () => import('./views/Home/Home.vue'),
      redirect: "/home/systeminfo",
      // 二级路由
      children: [{
          // 账户管理
          path: '/home/accountadd', //添加账户
          component: () => import('./views/AccountAdd/AccountAdd.vue')
        },
        {
          path: '/home/accountmanage', //账户 管理
          component: () => import('./views//AccountManage/AccountManage.vue')
        },
        {
          path: '/home/passwordmodify', //密码修改
          component: () => import('./views/PasswordModify/PasswordModify.vue')
        },
        {
          // 商品管理
          path: '/home/goodsmanage', //商品管理
          component: () => import('./views/GoodsManage/GoodsManage.vue')
        },
        {
          // 添加商品
          path: '/home/goodsadd', //添加商品
          component: () => import('./views/GoodsAdd/GoodsAdd.vue')
        },
        {
          // 统计管理
          path: '/home/selltotal', //销售统计
          component: () => import('./views/SellTotal/SellTotal.vue')
        },
        {
          // 进货统计
          path: '/home/stocktotal',
          component: () => import('./views/StockTotal/StockTotal.vue')
        },
        {
          // 系统信息
          path: '/home/systeminfo',
          component: () => import('./views/SystemInfo/SystemInfo.vue')
        },
        {
          // 分类管理
          path: '/home/classadmin',
          component: () => import('./views/ClassAdmin/ClassAdmin.vue')
        },
        {
          // 添加分类
          path: '/home/adminadd',
          component: () => import('./views/AdminAdd/AdminAdd.vue')
        },
        {
          // 库存管理
          path: '/home/storeadmin',
          component: () => import('./views/StoreAdmin/StoreAdmin.vue')
        },
        {
          // 添加库存
          path: '/home/storeadd',
          component: () => import('./views/StoreAdd/StoreAdd.vue')
        },
        {
          // 销售列表
          path: '/home/selllist',
          component: () => import('./views/SellList/SellList.vue')
        },
        {
          // 商品出库
          path: '/home/outboundgoods',
          component: () => import('./views/OutboundGoods/OutboundGoods.vue')
        },
        {
          // 商品退货
          path: '/home/goodsreturn',
          component: () => import('./views/GoodsReturn/GoodsReturn.vue')
        },
      ]
    }
  ]
})