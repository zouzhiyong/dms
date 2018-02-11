<template>
  <el-dialog v-if="dialogVisible" width="700px" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" :inline="true" size="small" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
        <el-tabs v-model="tabs" type="border-card">
          <el-tab-pane label="基本信息" name="first">
            <el-form-item label="仓库编号" prop="Code">
              <el-input v-model="formData.Code" placeholder="仓库编号" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="仓库名称" prop="Name">
              <el-input v-model="formData.Name" placeholder="仓库名称"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="Contact">
              <el-input v-model="formData.Contact" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="Tel">
              <el-input v-model="formData.Tel" placeholder="电话"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="Phone">
              <el-input v-model="formData.Phone" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item label="仓库地址" prop="Address">
              <el-input v-model="formData.Address" placeholder="仓库地址"></el-input>
            </el-form-item>
            <el-form-item label="货仓管理" prop="IsBin">
              <el-switch v-model="formData.IsBin" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="要求收货" prop="IsRequireReceive">
              <el-switch v-model="formData.IsRequireReceive" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="要求发货" prop="IsRequireShipment">
              <el-switch v-model="formData.IsRequireShipment" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="有效否" prop="IsValid">
              <el-switch v-model="formData.IsValid" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="仓库对应用户" name="second">
            <el-table ref="multipleTable" size="small" :data="formData.userView" border height="calc(100% - 40px)" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" header-align="center" align="center">
              </el-table-column>
              <el-table-column prop="UserName" label="用户名称" width="120" header-align="center">
              </el-table-column>
              <el-table-column prop="DeptName" label="部门" width="120" header-align="center">
              </el-table-column>
              <el-table-column prop="RightsName" label="权限" header-align="center">
              </el-table-column>
              <el-table-column prop="EmpCategoryName" label="职员类型" header-align="center">
              </el-table-column>
              <el-table-column prop="IsValid" label="有效否" header-align="center" align="center">
                <template slot-scope="scope">
                  <i v-if="scope.row.IsValid==1" class="fa fa-check" style="color:#409EFF"></i>
                  <i v-else class="fa fa-times" style="color:#C0C4CC"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </span>
    <span slot="footer">
      <custBotton>
        <el-button slot="cancleButton" @click="handleCanle">取 消</el-button>
        <el-button slot="saveButton" type="primary" @click="handleSave">保存</el-button>
      </custBotton>
    </span>
  </el-dialog>
</template>

<script>
  import { FindBasWarehouseForm, SaveBasWarehouseForm } from "../../../api/api";
  import custBotton from "./../../layout/layout_button";
  export default {
    data() {
      return {
        dialogVisible: false,
        multipleSelection: [],
        formData: {},
        tabs: "first",
        rules: {
          Name: [{ required: true, message: "仓库名称不能为空" }],
          Phone: [{ pattern: /^1[34578]\d{9}$/, message: "您的手机号码输入错误" }]
        }
      };
    },
    components: {
      custBotton
    },
    methods: {
      GetData(row) {
        FindBasWarehouseForm(row).then(result => {
          this.formData = result.data;
          this.dialogVisible = true;
          this.tabs = "first";
          this.$nextTick(function () {
            let tempObj = [];
            result.data.userView.forEach(row => {
              if (row.userFlag) {
                this.$refs.multipleTable.toggleRowSelection(row, true);
                tempObj.push(row);
              }
            });
            this.multipleSelection = tempObj;
          });
        });
      },
      handleSave() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            var obj = JSON.parse(JSON.stringify(this.formData));
            delete obj.userView;
            obj.userData = this.multipleSelection;
            SaveBasWarehouseForm(obj).then(result => {
              this.dialogVisible = false;
              this.$parent.$parent.$refs.table.$refs.table.GetData();
              this.$refs.ruleForm.resetFields();
            });
          } else {
            return false;
          }
        });
      },

      handleCanle() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
      },
      handleClose(done) {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
        done();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  };
</script>

<style scoped>
  .el-cascader,
  .el-input,
  .el-input__inner {
    width: 200px;
  }

  .el-dialog__wrapper>>>.el-dialog__body {
    padding: 0px 5px;
  }

  .el-tabs--border-card {
    box-shadow: none;
    border: none;
  }
</style>