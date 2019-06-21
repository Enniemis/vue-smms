<template>
  <div class="login">
    <div class="login-con">
      <h2>
        <i class="el-icon-user"></i>&emsp; 超市管理系统-登陆
      </h2>
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
        <el-form-item>
          <el-button type="info" @click="submitForm('ruleForm')">提交</el-button>
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {pwdReg} from '@/utils/Reg' ;
export default {
  data() {
    //   验证密码
      const checkPsd = (rule,value,callback)=>{
          //获取长度
          let length = value.length;
          if(value ===""){
              return callback(new Error("密码不能为空"))  //非空
          }else if(length<3 || length>6){
              return callback(new Error("密码长度3~6"))   //长度
          }else if(!pwdReg(value)){
              return callback(new Error("密码3~6位字母下划线数字"))    //正则
          }else{
            //   确认密码不为空 触发一致性认证
              if(this.ruleForm.checkPass !=="" ){
                  this.$refs.ruleForm.validateField('checkPass');
              }
            callback()  //成功
          }
      }
    //   验证确认密码
      const confirmPwd =(rule,value,callback)=>{
          if(value ===""){
              return callback(new Error("密码不能为空"))  //非空
          }else if(value !==this.ruleForm.pass ){
              return callback(new Error("两次密码不一致"))
          }else{
              callback();
          }
      }
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        user: ""
      },
      rules: {
        user: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pass: [
            {required:true, validator:checkPsd,trigger:"blur"}
          
        ],
        checkPass: [
          {required:true, validator:confirmPwd,trigger:"blur"}
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
        // 收集参数
        let params = {
          user:this.ruleForm.user,
          pass:this.ruleForm.pass
        }
        // 把参数发送给后端
        this.req.post('http://172.16.12.159:666/login/checklogin',this.qs.stringify(params))
          .then(response=>{
            // 接收后端响应的数据
            let{code,reason,token}=response.data;
            // 判断
            if(code===0){
              window.localStorage.setItem('atom',token)
              window.localStorage.setItem('username',this.ruleForm.user)

              this.$message({
                // 成功
                type:'success',
                message:reason
              })
              this.$router.push('/home')
            }else if(code===1){
              this.$message.error(reason)
              this.$router.push('/')
            }
          })
          .catch(err=>{
            console.log(err);
            
          })
        }else{
          console.log('不通过');
          return false;
          
        }
      });
          
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  }
};
</script>
<style lang="less">
@import "./login.less";
#app {
  background: url("../../assets/1.4.png");
}
</style>
