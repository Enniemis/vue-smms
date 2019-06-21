<template>
  <div class="left-nav">
    <h2 class="title">
      <i class="el-icon-menu"></i>
      华联超市管理系统
    </h2>
    <el-menu
      :default-active="$route.path"
      unique-opened
      router
      active-text-color="rgb(64, 158, 255)"
      background-color="rgb(48, 65, 86)"
    >
      <el-submenu :index="(i+1)+''" v-for="(nav,i) in leftNav" :key="i">
        <template slot="title">
          <i :class="nav.iconClass"></i>
          <span>{{nav.navTitle}}</span>
        </template>
        <el-menu-item
          :index="subNav.path"
          v-for="(subNav,i) in nav.children"
          :key="i"
        >{{subNav.navSubTitle}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftNav: [
        //导航一
        {
          iconClass: "el-icon-setting",
          navTitle: "系统信息",
          children: [{ path: "/home/systeminfo", navSubTitle: "系统信息" }]
        },
        // 导航二
        {
          iconClass: "el-icon-edit-outline",
          navTitle: "统计管理",
          children: [
            { path: "/home/selltotal", navSubTitle: "销售统计" },
            { path: "/home/stocktotal", navSubTitle: "进货统计" }
          ]
        },
        // 导航三
        {
          iconClass: "el-icon-s-order",
          navTitle: "商品管理",
          children: [
            { path: "/home/goodsmanage", navSubTitle: "商品管理" },
            { path: "/home/goodsadd", navSubTitle: "添加商品" }
          ]
        },
        // 导航四
        {
          iconClass: "el-icon-user",
          navTitle: "账号管理",
          children: [
            { path: "/home/accountmanage", navSubTitle: "账号管理" },
            { path: "/home/accountadd", navSubTitle: "添加账号" },
            { path: "/home/passwordmodify", navSubTitle: "密码修改" }
          ]
        },
        // 导航五
        {
          iconClass: "el-icon-menu",
          navTitle: "分类管理",
          children: [
            { path: "/home/classadmin", navSubTitle: "分类管理" },
            { path: "/home/adminadd", navSubTitle: "添加分类" }
          ]
        },
        // 导航六
        {
          iconClass: "el-icon-shopping-cart-full",
          navTitle: "进货管理",
          children: [
            { path: "/home/storeadmin", navSubTitle: "库存管理" },
            { path: "/home/storeadd", navSubTitle: "添加库存" }
          ]
        },
        // 导航七
        {
          iconClass: "el-icon-shopping-cart-2",
          navTitle: "出货管理",
          children: [
            { path: "/home/selllist", navSubTitle: "销售列表" },
            { path: "/home/outboundgoods", navSubTitle: "商品出库" },
            { path: "/home/goodsreturn", navSubTitle: "商品退货" }
          ]
        },
        // 导航八
       
      ]
    };
  }
};
</script>
    


<style lang="less">
.left-nav {
  .title {
    color: #fff;
    margin: 10px auto;
    text-align: center;
    font-size: 16px;
  }
  .el-menu {
    border-right: none;
    .el-submenu {
      color: #fff;
      .el-submenu__title {
        color: #fff;
        & > i {
          color: #fff;
        }
      }
    }
    .el-menu-item {
      color: #fff;
    }
  }
}
</style>

