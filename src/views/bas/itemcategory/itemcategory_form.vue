<template>
  <el-dialog v-if="dialogVisible" width="380px" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" size="small" :inline="false" ref="ruleForm" :model="formData" label-width='100px' class="demo-form-inline">
        <el-form-item label="类别编号" prop="Code">
          <el-input v-model="formData.Code" :disabled="true" placeholder="类别编号"></el-input>
        </el-form-item>
        <el-form-item label="类别名称" prop="Name">
          <el-input v-model="formData.Name" placeholder="类别名称"></el-input>
        </el-form-item>
        <el-form-item v-if="ItemType==1" label="商品大类" prop="ItemGroupID">
          <el-select v-model="formData.ItemGroupID" placeholder="商品大类">
            <el-option v-for="item in formData.ItemGroupIDList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顺序" prop="Sequence">
          <el-input v-model="formData.Sequence" placeholder="顺序"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input v-model="formData.Remark" placeholder="备注"></el-input>
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
import {
  FindBasItemGroupForm,
  FindBasItemCategoryForm,
  SaveBasItemGroupForm,
  SaveBasItemCategoryForm
} from "../../../api/api";
import custBotton from "./../../layout/layout_button";
import vueCropper from "vue-cropper";
export default {
  data() {
    return {
      ItemType: 1,
      dialogVisible: false,
      formData: {},
      rules: {
        Name: [{ required: true, message: "名称不能为空" }]
      }
    };
  },
  components: {
    custBotton,
    vueCropper
  },
  methods: {
    GetData(row) {
      this.ItemType = row.ItemType;
      if (row.ItemType == 2) {
        FindBasItemGroupForm(row).then(result => {
          var resultData = result.data;
          this.formData = resultData;
          this.dialogVisible = true;
        });
      } else {
        FindBasItemCategoryForm(row).then(result => {
          var resultData = result.data;
          let obj = {
            label: "--请选择--",
            value: 0
          };
          this.formData = resultData;
          this.formData.ItemGroupIDList.splice(0, 0, obj);
          this.dialogVisible = true;
        });
      }
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ItemType == 2) {
            SaveBasItemGroupForm(this.formData).then(result => {
              this.dialogVisible = false;
              this.$parent.$parent.$refs.table.$refs.table.GetData();
              this.$refs.ruleForm.resetFields();
            });
          } else {
            SaveBasItemCategoryForm(this.formData).then(result => {
              this.dialogVisible = false;
              this.$parent.$parent.$refs.table.$refs.table.GetData();
              this.$refs.ruleForm.resetFields();
            });
          }
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
