<template>
  <div class="account-manage">
    <div class="title">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>账户管理</h2>
        </div>
        <!-- 中间内容 -->
        <el-table
          ref="multipleTable"
          :data="accountTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="account" label="用户名称"></el-table-column>
          <el-table-column prop="userGroup" label="用户组"></el-table-column>
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
          </el-table-column>
          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button type="info" icon="el-icon-edit" plain @click="handleEdit(scope.row.id)">修改</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                plain
                @click="handleDelete(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="block" style="margin-top:20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 6, 9, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>
    <div style="margin-top: 20px">
      <el-button @click="batchDel" size="small" type="danger">批量删除</el-button>
      <el-button @click="toggleSelection()" size="small">取消选择</el-button>
    </div>
  </div>
</template>

<script>
// 引入时间格式化模块
import moment from "moment";
export default {
  data() {
    return {
      accountTableData: [], // 账号表格数据
      currentPage: 1, // 当前页
      total: 13, // 数据总条数
      pageSize: 3, // 每页条数
      visible: false, //模态框修改的显示和隐藏状态
      editForm: {
        account: "",
        userGroup: ""
      },
      editId: "",
      rules: {
        // 验证规则
        account: [
          { required: true, message: "账号不能为空", trigger: "change" },
          { min: 3, max: 6, message: "长度3 ~ 6位", trigger: "change" }
        ]
      },
      delIdArr: [] //批量删除id数组
    };
  },
  methods: {
    handleSelectionChange(selectData) {
      this.delIdArr = selectData.map(v => v.id);
    },
    // 当前页改变
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getAccounts();
    },
    // 每页条数改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getAccounts();
    },
    // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.req
            .get("http://172.16.12.159:666/account/accountdel", {
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
                this.getAccounts();
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
    // 修改
    handleEdit(id) {
      this.visible = true;
      // 保留id
      this.editId = id;
      // 发送请求给后台
      this.req
        .get("http://127.0.1:666/account/accountedit", {
          params: {
            id
          }
        })
        .then(response => {
          // 后台接收相应数据
          let { data } = response.data;
          // 回填表单
          this.editForm.account = data[0].account;
          this.editForm.userGroup = data[0].userGroup;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存修改
    saveEdit() {
      // 调用表单的前端验证
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.visible = false;
          // 收集参数
          let params = {
            account: this.editForm.account,
            userGroup: this.editForm.userGroup,
            id: this.editId
          };
          // 发送数据给后端
          this.req
            .post(
              "http://172.16.12.159:666/account/saveedit",
              this.qs.stringify(params)
            )
            .then(response => {
              // 接收后端响应的数据
              let { code, reason } = response.data;
              // 判断
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getAccounts(); //刷新列表
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    getAccounts() {
      // 收集参数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      this.req
        .get("http://172.16.12.159:666/account/accountlistbypage", {
          params
        })
        .then(response => {
          // 获取数据
          let { total, data } = response.data;
          // 渲染表格
          this.accountTableData = data;
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
          .get("http://172.16.12.159:666/account/deleteChooseItem", {
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
              this.getAccounts();
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
    this.getAccounts();
  },
  filters: {
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>

<style lang="less">
.account-manage {
  .title {
    .el-card {
      border-radius: 10px;
      .el-card__header {
        background: #e9e9e9;
        color: #000;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>

