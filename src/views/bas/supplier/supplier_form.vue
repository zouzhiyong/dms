<template>
  <el-dialog v-if="dialogVisible" width="700px" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" size="small" :inline="true" ref="ruleForm" :model="formData" label-width='100px' class="demo-form-inline">
        <el-form-item label="供应商编号" prop="Code">
          <el-input v-model="formData.Code" :disabled="true" placeholder="供应商编号"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="Name">
          <el-input v-model="formData.Name" placeholder="供应商名称"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="ShortName">
          <el-input v-model="formData.ShortName" placeholder="简称"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="Contact">
          <el-input v-model="formData.Contact" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item label="采购员" prop="EmployeeID">
          <el-select v-model="formData.EmployeeID" placeholder="采购员">
            <el-option v-for="item in formData.EmployeeIDList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商类型" prop="SupplierCategoryID">
          <el-select v-model="formData.SupplierCategoryID" placeholder="客户类型">
            <el-option v-for="item in formData.SupplierCategoryIDList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="助记码" prop="HelperCode">
          <el-input v-model="formData.HelperCode" placeholder="助记码"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="Fax">
          <el-input v-model="formData.Fax" placeholder="传真"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="Phone">
          <el-input v-model="formData.Phone" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item label="固定电话" prop="Tel">
          <el-input v-model="formData.Tel" placeholder="固定电话"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="Address">
          <el-input v-model="formData.Address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="有效否" prop="IsValid">
          <el-switch v-model="formData.IsValid" :active-value="1" :inactive-value="0"></el-switch>
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
import { FindBasSupplierForm, SaveBasSupplierForm } from "../../../api/api";
import custBotton from "./../../layout/layout_button";
import vueCropper from "vue-cropper";
export default {
  data() {
    return {
      dialogVisible: false,
      formData: {},
      rules: {
        Name: [{ required: true, message: "名称不能为空" }],
        Phone: [
          { required: true, message: "电话号码不能为空" },
          { pattern: /^1[34578]\d{9}$/, message: "手机号码输入错误" }
        ]
      }
    };
  },
  components: {
    custBotton,
    vueCropper
  },
  methods: {
    GetData(row) {
      FindBasSupplierForm(row).then(result => {
        var resultData = result.data;
        let obj = {
          label: "--请选择--",
          value: 0
        };

        this.formData = resultData;
        this.formData.SupplierCategoryIDList.splice(0, 0, obj);
        this.formData.EmployeeIDList.splice(0, 0, obj);
        this.dialogVisible = true;
      });
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          SaveBasSupplierForm(this.formData).then(result => {
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
      this.checkImg = false;
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
.el-input,
.el-input__inner {
  width: 200px;
}

.el-button--mini {
  padding: 7px 7px;
}

.cropperButton>>>.el-button {
  margin: 10px auto;
}
</style>
