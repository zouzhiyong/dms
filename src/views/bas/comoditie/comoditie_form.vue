<template>
  <el-dialog width="650px" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" size="small" :inline="true" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
        <el-form-item label="商品编码" prop="Code">
          <el-input v-model="formData.Code" placeholder="商品编码"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="FullName">
          <el-input v-model="formData.FullName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品简称" prop="ShorName">
          <el-input v-model="formData.ShorName" placeholder="商品简称"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="TypeID">
          <el-select v-model="formData.TypeID" placeholder="商品类型">
            <el-option v-for="item in formData.TypeIDList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" prop="BrandID">
          <el-select v-model="formData.BrandID" placeholder="品牌">
            <el-option v-for="item in formData.BrandIDList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>    
        <el-form-item label="有效否" prop="IsValid">
          <el-select v-model="formData.IsValid" placeholder="有效否">
            <el-option v-for="item in formData.IsValidList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>           
        <el-form-item label="进货价" prop="RecPrice">
          <el-input v-model.number="formData.RecPrice" placeholder="进货价"></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="SalPrice">
          <el-input v-model.number="formData.SalPrice" placeholder="销售价"></el-input>
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
import { FindBasComoditieForm, SaveBasComoditieForm } from "../../../api/api";
import custBotton from "./../../layout/layout_button";
export default {
  data() {
    return {
      dialogVisible: false,
      formData: {},
      rules: {
        FullName: [{ required: true, message: "商品名称不能为空" }],
        RecPrice: [{ type: "number", message: "格式不对" }],
        SalPrice: [{ type: "number", message: "格式不对" }]
      }
    };
  },
  components: {
    custBotton
  },
  methods: {
    GetData(row) {
      FindBasComoditieForm(row).then(result => {
        this.formData = result.data;
        this.dialogVisible = true;
      });
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          SaveBasComoditieForm(this.formData).then(result => {
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