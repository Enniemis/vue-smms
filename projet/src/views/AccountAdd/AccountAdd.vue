<template>
  <div class="account-add">
    <div class="account-con">
      <div class="title">
        <h2>&emsp; 添加管理员账号</h2>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账户" prop="user">
          <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择分组" prop="userGurp">
          <el-select v-model="ruleForm.userGurp" placeholder="请选择用户组">
            <el-option label="管理员账户" value="超级账户"></el-option>
            <el-option label="普通账户" value="普通账户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="submitForm('ruleForm')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import req from '@/utils/request'

export default {
  data() {
    //   验证密码
    const checkPsd = (rule, value, callback) => {
      //获取长度
      let length = value.length;
      if (value === "") {
        return callback(new Error("密码不能为空")); //非空
      } else if (length < 3 || length > 6) {
        return callback(new Error("密码长度3~6")); //长度
      } else {
        //   确认密码不为空 触发一致性认证
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback(); //成功
      }
    };
    //   验证确认密码
    const confirmPwd = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不能为空")); //非空
      } else if (value !== this.ruleForm.pass) {
        return callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        user: "",
        userGurp: ""
      },
      rules: {
        user: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pass: [{ required: true, validator: checkPsd, trigger: "blur" }],
        checkPass: [{ required: true, validator: confirmPwd, trigger: "blur" }],
        userGurp: [{ required: true, message: "请选择分组", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            user: this.ruleForm.user,
            pass: this.ruleForm.pass,
            userGurp: this.ruleForm.userGurp
          };
          req
            .post(
              "http://172.16.12.159:666/account/accountadd",
            params)
            
            .then(res => {
              // 接收后端响应数据
              let { code, reason } = res;
              // 判断
              if (code === 0) {
                this.$message({
                  // 弹成功提示
                  message: reason,
                  type: "success"
                });
                this.$router.push("/home/accountmanage"); // 跳转到账号管理
              } else if (code === 1) {
                this.$message.error(reason); // 弹失败提示
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("验证不通过");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.account-add {
  min-width: 66.375rem;
  border: 2px solid #e9e9e9;
  background: #fff;
  .title {
    height: 2.75rem;
    background: #e9e9e9;
    line-height: 44px;
  }
  .el-form {
    margin-top: 30px;
    .el-input__inner {
      width: 300px;
    }
  }
}
</style>

