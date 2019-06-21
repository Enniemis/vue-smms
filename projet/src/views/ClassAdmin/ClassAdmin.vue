<template>
  <div class="class-admin">
    <div class="title">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>分类管理</h2>
        </div>
        <!-- 分类名称 -->
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="分类名称 "></el-table-column>
          <el-table-column prop="manage" label="管理">
               <div>
              <el-button type="info" icon="el-icon-edit" plain>修改</el-button>
              <el-button type="info" icon="el-icon-delete" plain>删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            tableData :[
                {
                    name : "日用品",
                },
                 {
                    name : "舒肤佳",
                },
                 {
                    name : "海飞丝",
                },
                 {
                    name : "霸王防脱洗发水",
                },
                 {
                    name : "舒肤佳A",
                },
                 {
                    name : "食品",
                },
                 {
                    name : "海带丝",
                },
                 
                 {
                    name : "烟酒",
                },
                 {
                    name : "茅台",
                },
                 {
                    name : "玉溪",
                }
            ]
        }
    }
};
</script>

<style lang="less">
.class-admin {
   margin-right: -15px;
  .title {
    border-radius: 10px;
    .el-card {
      .el-card__header {
        background: #e9e9e9;
        color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>

