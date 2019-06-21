<template>
  <div class="system-info">
    <div class="title">
      <!-- 头 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>系统信息</span>
        </div>
        <el-alert type="warning">
          <i class="el-icon-warning"></i> 商品总数:5
        </el-alert>
        <el-alert type="warning">
          <i class="el-icon-warning"></i> 导入数据
        </el-alert>
        <!-- 中间内容 -->
        <!-- 左边 -->
        <el-row :gutter="30" style="margin-top:30px;">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>销售排行</span>
              </div>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="商品名称" ></el-table-column>
                <el-table-column prop="sales" label="销量" ></el-table-column>
              </el-table>
            </el-card>
          </el-col>

          <!-- 右边 -->
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
                <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>缺货的商品</span>
              </div>
              <el-table :data="goodsLack" stripe style="width: 100%">
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="repertory" label="库存"></el-table-column>
                <el-table-column prop="operation" label="操作"></el-table-column>
              </el-table>
            </el-card>

            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            tableData : [{
                name : "霸王洗发水",
                sales : "10"
            },
            {
                name : "霸王防脱洗发水",
                sales : "20"
            },
            {
                name : "霸王生发洗发水",
                sales : "50"
            },
            {
                name : "海飞丝",
                sales : "1"
            },
            ],
            goodsLack :[
                {
                    name : "霸王防脱生发水",
                    repertory : "0",
                    operation : "入库"
                },
                 {
                    name : "屌乐美",
                    repertory : "0",
                    operation : "入库"
                },
                 {
                    name : "海飞丝",
                    repertory : "100",
                    operation : "入库"
                },
            ]
        }
    }
};
</script>

<style lang="less">
.system-info {
   margin-right: -15px;
  .title {
    .el-card {
      border-radius: 10px;
      .el-card__header {
        background: #e9e9e9;
        color: #000;
        font-size: 18px;
        font-weight: bold;
      }
      .el-alert {
        margin: 20px auto;
      }
    }
  }
}
</style>

