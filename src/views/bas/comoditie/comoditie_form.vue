<template>
  <el-dialog width="650px" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" size="small" :inline="true" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
        <el-tabs type="border-card" value="tab1">
          <el-tab-pane label="基本信息" name="tab1">
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
          </el-tab-pane>
          <el-tab-pane label="单位管理" name="tab2">单位管理</el-tab-pane>
          <el-tab-pane label="商品照片管理" name="tab3">
            <el-upload ref="upload" class="upload-demo" multiple :limit="3" :on-exceed="handleExceed" :headers="headers" accept="image/png,image/jpeg" action="/WebAppDms/api/customer/ImgUpload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
import {
  FindBasComoditieForm,
  SaveBasComoditieForm,
  UploadPath
} from "../../../api/api";
import custBotton from "./../../layout/layout_button";
let ticket = "BasicAuth " + sessionStorage.getItem("Ticket") || "";
export default {
  data() {
    return {
      headers: {
        Authorization: ticket
      },
      dialogVisible: false,
      formData: {},
      rules: {
        FullName: [{ required: true, message: "商品名称不能为空" }],
        RecPrice: [{ type: "number", message: "格式不对" }],
        SalPrice: [{ type: "number", message: "格式不对" }]
      },
      fileList: []
    };
  },
  components: {
    custBotton
  },
  methods: {
    GetData(row) {
      FindBasComoditieForm(row).then(result => {
        if (result.data.Photo != "" && result.data.Photo != null) {
          var arr = result.data.Photo.split(",");
          arr.map(item => {
            this.fileList.push({ name: item, url: UploadPath + item });
          });
        }
        this.formData = result.data;
        this.dialogVisible = true;
      });
    },
    handleSave() {
      var arr = [];
      this.$refs.upload.uploadFiles.map(item => {
        var uploadFilesUrl = item.response ? item.response.url : item.name;
        arr.push(uploadFilesUrl);
      });
      this.formData.Photo = arr.toString();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          SaveBasComoditieForm(this.formData).then(result => {
            this.dialogClose();
            this.$parent.$parent.$refs.table.$refs.table.GetData();
          });
        } else {
          return false;
        }
      });
    },
    handleCanle() {
      this.dialogClose();
    },
    handleClose(done) {
      this.dialogClose();
      done();
    },
    dialogClose() {
      this.fileList = [];
      this.formData = {};
      this.$refs.ruleForm.resetFields();
      this.$refs.upload.clearFiles();
      this.dialogVisible = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
          fileList.length} 个文件`
      );
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
  padding: 0 0;
}
</style>