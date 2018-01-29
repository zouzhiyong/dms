<template>
  <el-dialog v-if="dialogVisible" width="345px" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" :inline="false" size="small" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
        <el-form-item label="部门编号" prop="Code">
          <el-input v-model="formData.Code" :disabled="true" placeholder="部门编号"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="Name">
          <el-input v-model="formData.Name" placeholder="部门名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上级部门" prop="ParentCode">
          <el-select v-model="formData.ParentCode" placeholder="上级模块">
            <el-option v-for="item in formData.ParentCodeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="顺序" prop="Sequence">
          <el-input v-model="formData.Sequence" placeholder="顺序"></el-input>
        </el-form-item>
        <el-form-item label="有效否" prop="IsValid">
          <el-switch v-model="formData.IsValid" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input v-model="formData.Remark" placeholder="备注"></el-input>
        </el-form-item>
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
import { FindBasDepartmentForm, SaveBasDepartmentForm } from "../../../api/api";
import custBotton from "./../../layout/layout_button";
export default {
  data() {
    return {
      dialogVisible: false,
      formData: {},
      rules: {
        Name: [{ required: true, message: "部门名称不能为空" }]
      }
    };
  },
  components: {
    custBotton
  },
  methods: {
    GetData(row) {
      FindBasDepartmentForm(row).then(result => {
        this.formData = result.data;
        this.formData.ParentCodeList.splice(0, 0, {
          label: "无上级",
          value: "&"
        });
        this.dialogVisible = true;
      });
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          SaveBasDepartmentForm(this.formData).then(result => {
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
</style>