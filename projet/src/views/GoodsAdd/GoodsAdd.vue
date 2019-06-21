<template>
  <div class="goods-add">
    <p class="goods-title">
      1.你可以在这里添加新的商品或者编辑已有的商品。2.新添加商品的时候可以同时进行入库(入库必须有数量和进价)!3.带
      <span>*</span>的项目必填
    </p>
    <div class="title">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>添加商品</h2>
        </div>
        <!-- 表单 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          :label-position="labelPosition"
        >
          <!-- 所属分类 -->
          <el-form-item label="所属分类" prop="classify">
            <el-select v-model="ruleForm.classify" placeholder="选择分类">
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
              <el-option label="烟酒类" value="烟酒类"></el-option>
              <el-option label="服装类" value="服装类"></el-option>
              <el-option label="蔬菜类" value="蔬菜类"></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品条形码 -->
          <el-form-item label="商品条形码" prop="barCode">
            <el-input v-model="ruleForm.barCode"></el-input>
            <el-button type="success" @click="successBtn">生成条形码</el-button>
          </el-form-item>
          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="ruleForm.goodsName"></el-input>
          </el-form-item>
          <!-- 商品进价 -->
          <el-form-item label="商品进价:" prop="goodsPrice">
            <el-input v-model="ruleForm.goodsPrice" @blur="autoPrice"></el-input>
          </el-form-item>
          <!-- 商品售价: -->
          <el-form-item label="商品售价" prop="goodsSell">
            <el-input v-model="ruleForm.goodsSell"></el-input>
          </el-form-item>
          <!-- 市场价 -->
          <el-form-item label="市场价:" prop="marketPrice">
            <el-input v-model="ruleForm.marketPrice"></el-input>
          </el-form-item>

          <!-- 入库数量 -->
          <el-form-item label="入库数量:" prop="storage">
            <el-input v-model="ruleForm.storage"></el-input>
            <p>记重商品单位位千克</p>
          </el-form-item>
          <!-- 商品重量 -->
          <el-form-item label="商品重量:" prop="goodsWeight">
            <el-input v-model="ruleForm.goodsWeight"></el-input>
          </el-form-item>
          <!-- 商品单位 -->
          <el-form-item label="商品单位:" prop="goodsUnit">
            <el-input v-model="ruleForm.goodsUnit"></el-input>
          </el-form-item>
          <!-- 会员优惠: -->
          <el-form-item label="会员优惠:" prop="vipDiscount">
            <el-radio-group v-model="ruleForm.vipDiscount">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 是否促销 -->
          <el-form-item label="是否促销:" prop="promotion">
            <el-radio-group v-model="ruleForm.promotion">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 商品简介 -->
          <el-form-item label="商品简介" prop="goodsDesc">
            <el-input type="textarea" v-model="ruleForm.goodsDesc"></el-input>
          </el-form-item>

          <!-- 添加 -->
          <el-form-item>
            <el-button type="primary" @click="submitAdd()">添加</el-button>
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
      labelPosition: "top",
      ruleForm: {
        classify: "",
        barCode: "",
        goodsName: "",
        goodsSell: "",
        marketPrice: "",
        goodsPrice: "",
        storage: "",
        goodsWeight: "",
        goodsUnit: "",
        vipDiscount: "",
        promotion: "",
        textarea: ""
      },
      rules: {
        classify: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        barCode: [
          { required: true, message: "必须生成条形码", trigger: "blur" }
        ],
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodsPrice: [
          { required: true, message: "请输入商品进价", trigger: "blur" }
        ],
        goodsSell: [
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ],
        marketPrice: [
          { required: true, message: "请输入市场价", trigger: "blur" }
        ],
        storage: [
          { required: true, message: "请输入入库数量", trigger: "blur" }
        ],
        goodsWeight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        goodsUnit: [
          { required: true, message: "请输入商品单位", trigger: "blur" }
        ],
        vipDiscount: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        promotion: [{ required: true, message: "不能为空", trigger: "blur" }],
        textarea: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitAdd() {
      // 获取整个表单，调用验证方法
      this.$refs.ruleForm.validate(valid => {
        // 所有前端验证通过 valid:true, 否则valid: false
        if (valid) {
          // 收集参数
          let params = {
            classify: this.ruleForm.classify,
            barCode: this.ruleForm.barCode,
            goodsName: this.ruleForm.goodsName,
            goodsSell: this.ruleForm.goodsSell,
            marketPrice: this.ruleForm.marketPrice,
            goodsPrice: this.ruleForm.goodsPrice,
            storage: this.ruleForm.storage,
            goodsWeight: this.ruleForm.goodsWeight,
            goodsUnit: this.ruleForm.goodsUnit,
            vipDiscount: this.ruleForm.vipDiscount,
            promotion: this.ruleForm.promotion,
            goodsDesc: this.ruleForm.goodsDesc
          };

          // 发送给后端
          this.req
            .post(
              "http://172.16.12.159:666/goods/goodsadd",
              this.qs.stringify(params)
            )
            .then(response => {
              // 接收后端响应数据
              let { code, reason } = response.data;
              // 判断
              if (code === 0) {
                // 成功
                this.$message({
                  // 弹成功提示
                  message: reason,
                  type: "success"
                })
                this.$router.push('/home/goodsmanage'); // 跳转到商品管理
              } else if (code === 1) {
                // 失败
                this.$message.error(reason); // 弹失败提示
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("前端验证不通过，不允许提交");
          return false;
        }
      });
    },
    successBtn() {
      let num = "";
      for (var i = 0; i < 10; i++) {
        num += Math.floor(Math.random() * 10);
      }
      this.ruleForm.barCode = num;
    },
    autoPrice() {
      this.ruleForm.goodsSell = (
        parseFloat(this.ruleForm.goodsPrice) * 1.5
      ).toFixed(2);
      this.ruleForm.marketPrice = (
        parseFloat(this.ruleForm.goodsPrice) * 2
      ).toFixed(2);
    }
  }
};
</script>

<style lang="less">
.goods-add {
  margin-right: -17px;
  .goods-title {
    margin: 10px auto;
    font-size: 16px;
    & > span {
      color: #f00;
    }
  }
  .title {
    border-radius: 10px;
    .el-card {
      .el-card__header {
        background: #e9e9e9;
      }
    }
    .el-form {
      .el-input {
        width: 240px;
      }
      .el-button {
        margin: 20px;
      }
    }
  }
}
</style>

