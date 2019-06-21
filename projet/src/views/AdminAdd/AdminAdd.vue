<template>
  <div class="admin-add">
    <div class="title">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>添加管理</h2>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 所属分类 -->
          <el-form-item label="所属分类:" prop="category">
            <el-select v-model="ruleForm.category" placeholder="--顶级分类--">
              <el-option label="普通" value="putong"></el-option>
              <el-option label="高级" value="gaoji"></el-option>
              <el-option label="特级" value="teji"></el-option>
            </el-select>
          </el-form-item>
          <!-- 分类名称 -->
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态:" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="启动"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="add()">添加</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        category: "",
        name: "",
        resource: "禁用"
      },
      rules: {
        category: [{ required: true, message: "请选择分类", trigger: "change" }]
      }
    };
  },
  methods: {
    add() {
      this.$refs.ruleForm.validate((valid)=>{
          if(valid){
            console.log("通过");
            
          }else{
            console.log("不通过");
            
          }
      })
    }
  }
};
</script>

<style lang="less">
.admin-add {
  .title {
    border-radius: 10px;
    .el-card {
      .el-card__header {
        background: #e9e9e9;
        color: #000;
        font-weight: bold;
      }
      .el-form {
        .el-input__inner:last-child {
          width: 300px;
        }
      }
    }
  }
}
</style>

