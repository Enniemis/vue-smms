<template>
  <div class="header">
    <div class="title">
      
 <el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">
          <h1>
        <i class="el-icon-menu"></i>
        华联超市管理系统
      </h1>    
    </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">
      <el-row :gutter="20">
        <el-col :span="18">
          <span class="demonstration"></span>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        陈冠希 <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command='personal'>个人中心</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" command='logout'>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
        </el-col>
        <el-col :span="6">
          <div class="poh">
            <img src="./header.jpg" alt="">
          </div>
        </el-col>
      </el-row>
    
    </div></el-col>
 
</el-row>

    </div>
  </div>
</template>

<script>
export default {
  methods:{
    handleCommand(command){
      if(command==='logout'){
        // 清除token
        local.remove('atom')
        // 弹出提示信息
        this.$message({
          type:'success',
          message:'退出系统成功'
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000);
      }else if(command === 'personal'){
        // 个人中心
      }
    }
  }
};
</script>

<style lang="less">
.header {
  .title {
      border-top: 2px solid #f1f1f1;
      background: #f1f1f1;
      border: 2px solid #eaeaea;
      border-radius: 10px;
     h1 {
      color: #222;
      font-size: 20px;
    }
    p{
       color: #222;
      font-size: 20px;
    }
    .el-row{
      .el-col{
        margin: 7px auto;
      }
      .el-col:nth-child(1){
        text-align: right; 
   
        }
      }
     
    }
    .poh{
          height: 50px;
          width: 50px;
          border-radius: 100%;
          &>img{
            width: 100%;
            height: 100%;
          border-radius: 100%;
          margin-top: -10px;
          }
   
  }
}
</style>