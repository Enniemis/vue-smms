<template>
  <div class="account-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>账号管理</h3>
      </div>
      <div>
        <div class="searchForm">
          <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="所属分类" prop="category">
              <el-select v-model="searchForm.category" placeholder="请选择分类">
                <el-option label="全部分类" value="全部分类"></el-option>
                <el-option label="电子类" value="电子类"></el-option>
                <el-option label="食品类" value="食品类"></el-option>
                <el-option label="烟酒类" value="烟酒类"></el-option>
                <el-option label="服装类" value="服装类"></el-option>
                <el-option label="蔬菜类" value="蔬菜类"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字">
              <el-input v-model="searchForm.user" placeholder="商品名称或条形码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="goodsTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <!-- 条形码 -->
          <el-table-column prop="barCode" label="条形码"></el-table-column>

          <!-- 商品名称 -->
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>

          <!-- 所属分类 -->
          <el-table-column prop="classify" label="所属分类"></el-table-column>

          <!-- 售价 -->
          <el-table-column prop="goodsSell" label="售价"></el-table-column>

          <!-- 是否促销 -->
          <el-table-column prop="promotion" label="是否促销"></el-table-column>

          <!-- 日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>
              </el-button>
              <!-- 删除按钮 -->
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 批量删除&取消选择按钮 -->
        <div style="margin-top: 20px">
          <el-button size="small" type="danger" @click="batchDel">批量删除</el-button>
          <el-button size="small" type="primary" @click="toggleSelection()">取消选择</el-button>
        </div>

        <!-- 修改表单模态框 -->
        <el-dialog title="修改账号" width="420px" :visible.sync="visible">
          <!-- 修改表单 -->
          <el-form ref="editForm" :model="editForm" style="width: 316px" :rules="rules">
            <!-- 账号 -->
            <el-form-item label="账号" prop="account" label-width="120px">
              <el-input v-model="editForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 用户组 -->
            <el-form-item label="用户组" label-width="120px">
              <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 修改表单按钮 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入时间格式化模块
import moment from "moment";

export default {
  data() {
    return {
      goodsTableData: [], // 商品表格
      editForm: {}, // 修改表单
      visible: false, // 修改模态框是否显示
      rules: {}, // 验证规则
      currentPage: 1, // 当前页码
      pageSize: 3, // 每页条数
      total: 0, // 总条数
      searchForm: {} // 查询表单
    };
  },
  methods: {
    handleSizeChange(pageSize) {
      // 每页条数改变
      this.pageSize = pageSize;
      this.getData(); // 2. 调用分页函数
    },
    handleCurrentChange(currentPage) {
      // 当前页改变
      this.currentPage = currentPage;
      this.getData(); // 3. 调用分页函数
    },
    getData() {
      // 分页函数
      // 收集参数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      this.req
        .get("http://172.16.12.159:666/goods/goodslistbypage", {
          params
        })
        .then(response => {
          // 获取数据
          let { total, data } = response.data;
          // 渲染表格
          this.goodsTableData = data;
          this.total = total;
          // 判断边界
          if (!data.length && this.currentPage !== 1) {
            this.currentPage -= 1;
            this.getAccounts();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
     handleSelectionChange(selectData) {
      this.delIdArr = selectData.map(v => v.id);
    },
    // 修改
    handleEdit(){},
      // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.req
            .get("http://172.16.12.159:666/goods/goodsdel", {
              params: {
                id
              }
            })
            .then(response => {
              // 接收后端相应数据
              let { code, reason } = response.data;
              // 判断
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                // 刷新列表
                this.getData()
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "删除已取消"
          });
        });
    },
     // 批量取消
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 批量删除
    batchDel() {
      // 如果没有选中
      if (!this.delIdArr.length) {
        this.$message.error("请选择后再操作!");
        return;
      }
      // 优化体验
      this.$confirm("确认执行批量删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 确认删除 发送请求把id全部发送给后端
        this.req
          .get("http://172.16.12.159:666/goods/deleteChooseItem", {
            params: {
              idArr: this.delIdArr
            }
          })
          .then(response => {
            console.log(response.data);
            // 接收数据
            let { code, reason } = response.data;
            // 判断
            if (code === 0) {
              // 成功提示
              this.$message({
                type: "success",
                message: "reason"
              });
              // 刷新列表
              this.getData()
            } else if (code === 1) {
              // 失败提示
              this.$message.error(reason);
            }
          })
          .catch(err => {
            this.$message({
              type: "info",
              message: "取消批量删除"
            });
          });
      });
    }
  },
  created() {
    this.getData(); // 1. 调用分页函数
  },
  filters: {
    filterCtime(ctime) {
      // 过滤时间格式
      return moment(ctime).format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="less">
.account-manage {
  .el-card {
    .el-card__header {
      background-color: #f1f1f1;
    }
  }
}
</style>