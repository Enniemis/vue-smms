<template>
  <div class="home">
    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="200px">
        <leftNav/>
      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header>
          <Rheader/>
        </el-header>
        <!-- 中间内容 -->
        <el-main>
          <router-view/>
        </el-main>
        <!-- 尾部 -->
        <el-footer>
          <Rfooter/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 左侧导航
import leftNav from "@/components/leftNav/leftNav.vue";
// 右侧头部
import Rheader from "@/components/Header/Header.vue";
// 右侧尾部
import Rfooter from "@/components/Footer/Footer.vue";

export default {
  components: { leftNav, Rheader, Rfooter }
};
</script>

<style lang="less">
.home {
  height: 100%;
  .el-container {
    //容器
    height: 100%;
    .el-aside {
      //左侧导航
      background-color: rgb(48, 65, 86);
    }
    // 右边容器
    .el-container {
      background-color: #f7f7f7;
      .el-main {
        //中间内容
        background-color: #f7f7f7;
        // overflow: hidden;
      }
      .el-header {
        //头部
        background-color: #f7f7f7;
        margin-top: 30px;
      }
      .el-footer {
        //尾部
        background-color: #f7f7f7;
        line-height: 60px;
      }
    }
  }
}
</style>

