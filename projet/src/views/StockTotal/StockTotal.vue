<template>
  <div class="stock-total">
    <div class="title">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>进货统计</h2>
        </div>
        <div id="Mycharts" :style="{width:'1200px',height:'500px'}"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
    mounted (){
        this.useCharts();
    },
  methods: {
    useCharts() {
      let Mycharts = this.$echarts.init(document.getElementById("Mycharts"));
      var option = {
        xAxis: {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 600, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
          }
        ]
      };
      Mycharts.setOption(option);
    }
  }
};
</script>

<style lang="less">
.stock-total {
   margin-right: -15px;
  .title {
    .el-card {
      border-radius: 10px;
      .el-card__header {
        background: #e9e9e9;
      }
    }
  }
}
</style>

