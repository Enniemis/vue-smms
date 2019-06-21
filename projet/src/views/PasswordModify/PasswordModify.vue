<template>
  <div class="password-modify">
    <div class="password-con">
      <div class="title">
        <h2>&emsp; 修改账户密码</h2>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="text" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="submitForm('ruleForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import local from '@/utils/local'
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
    //旧密码
    const checkOldePass = (rule,value,callback)=>{
      let username = window.localStorage.getItem("username");
     
      if(value===""){
        callback(new Error('旧密码不能为空'))
      }else{
         this.req.get(`http://172.16.12.159:666/account/passwordmodify?oldPass=${value}&username=${username}`)
        .then(response =>{
        let { code, reason } = response.data;
        if(code===0){
          callback(new Error(reason))
        }else if(code===1){
          callback()
        }
      })
      .catch(err=>{
        console.log(err);
        
      })
      }
      
    }
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        oldPass: ""
      },
      rules: {
        oldPass: [
          { required: true, message: "请输密码", trigger: "blur" },
          { required: true, validator: checkOldePass, trigger: "blur" }
        ],
        pass: [{ required: true, validator: checkPsd, trigger: "blur" }],
        checkPass: [{ required: true, validator: confirmPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            pass: this.ruleForm.pass,
            username:window.localStorage.getItem("username"),
            oldPass:this.ruleForm.oldPass,
          };
          console.log(params);
          
          this.req
            .post("http://172.16.12.159:666/account/savepasswordmod", this.qs.stringify(params))
            .then(response => {
              // 接收数据
              let { code, reason } = response.data;
              
              // 判断
              if (code === 0) {
                // 弹成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                // 清除token 退出登录
              local.remove('atom')
                this.$router.push('/login');
              }else{
                return false;
                console.log("验证不通过");
                
              }
            })
            .catch(err => {

            });
        }
      });
    }
  }
};
</script>

<style lang="less">
.password-modify {
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

