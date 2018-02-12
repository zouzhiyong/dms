<template>
  <el-dialog v-if="dialogVisible" width="650px" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" size="small" :inline="true" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
        <el-tabs v-model="tabs" type="border-card">
          <el-tab-pane label="基本信息" name="first">
            <el-form-item label="客户编码" prop="Code">
              <el-input v-model="formData.Code" placeholder="客户编码"></el-input>
            </el-form-item>
            <el-form-item label="客户名称" prop="Name">
              <el-input v-model="formData.Name" placeholder="客户名称"></el-input>
            </el-form-item>
            <el-form-item label="简称" prop="ShortName">
              <el-input v-model="formData.ShortName" placeholder="简称"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="Contact">
              <el-input v-model="formData.Contact" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item label="业务员" prop="EmployeeID">
              <el-select v-model="formData.EmployeeID" placeholder="业务员">
                <el-option v-for="item in formData.EmployeeIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户类型" prop="CustCategoryID">
              <el-select v-model="formData.CustCategoryID" placeholder="客户类型">
                <el-option v-for="item in formData.CustCategoryIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="助记码" prop="HelperCode">
              <el-input v-model="formData.HelperCode" placeholder="助记码"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="Phone">
              <el-input v-model="formData.Phone" placeholder="手机"></el-input>
            </el-form-item>
            <el-form-item label="固定电话" prop="Tel">
              <el-input v-model="formData.Tel" placeholder="固定电话"></el-input>
            </el-form-item>
            <el-form-item label="销售区域" prop="RegionIDArr">
              <el-cascader :clearable="true" :props="props" :options="formData.RegionIDList" v-model="formData.RegionIDArr"></el-cascader>
            </el-form-item>
            <el-form-item label="地址" prop="Address">
              <el-input v-model="formData.Address" placeholder="地址"></el-input>
            </el-form-item>
            <el-form-item label="有效否" prop="IsValid">
              <el-switch v-model="formData.IsValid" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="图片" name="three">
            <el-col style="width:480px">
              <el-form-item prop="Photo">
                <vueCropper @imgLoad="imgLoad" ref="cropper" :fixed="option.fixed" :img="img" :autoCrop="option.autoCrop" :fixedNumber="option.fixedNumber" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canScale="option.canScale" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :fixedBox="option.fixedBox" :original="option.original" @realTime="realTime" style="height:300px;width:480px;"></vueCropper>
              </el-form-item>
            </el-col>
            <el-col class="cropperButton" style="height:300px;text-align:center;width:130px">
              <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
              <label class="el-button el-button--primary el-button--mini" for="uploads">
                <i class="el-icon-upload el-icon--right"></i> 上传
              </label>
              <button @click="changeScale(0.2)" class="el-button el-button--primary el-button--mini">
                <i class="fa fa-plus"></i>放大</button>
              <button @click="changeScale(-0.2)" class="el-button el-button--primary el-button--mini">
                <i class="fa fa-minus"></i>缩小</button>
              <!-- <button @click="startCrop" class="el-button el-button--primary el-button--mini">
                <i class="fa fa-crop"></i> 剪切</button> -->
              <button @click="rotateLeft" class="el-button el-button--primary el-button--mini">
                <i class="fa fa-undo"></i> 向左</button>
              <button @click="rotateRight" class="el-button el-button--primary el-button--mini">
                <i class="fa fa-repeat"></i> 向右</button>
            </el-col>
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
  FindBasCustomerForm,
  SaveBasCustomerForm,
  UploadPath
} from "../../../api/api";
import custBotton from "./../../layout/layout_button";
import vueCropper from "vue-cropper";
export default {
  data() {
    return {
      props: {
        value: "RegionID",
        label: "Name"
      },
      checkImg: false,
      img: "",
      tabs: "first",
      dialogVisible: false,
      formData: {},
      rules: {
        Name: [{ required: true, message: "客户名称不能为空" }],
        Phone: [
          { required: true, message: "电话号码不能为空" },
          { pattern: /^1[34578]\d{9}$/, message: "手机号码输入错误" }
        ]
      },
      option: {
        size: 1,
        autoCrop: true,
        full: false,
        outputType: "png",
        canScale: true,
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixedNumber: [150, 150],
        fixed: true,
        fixedBox: true
      },
      previews: {}
    };
  },
  components: {
    custBotton,
    vueCropper
  },
  methods: {
    GetData(row) {
      FindBasCustomerForm(row).then(result => {
        var resultData = result.data.list;
        let obj = {
          label: "--请选择--",
          value: 0
        };
        if (row.UserID == 0) {
          this.img = "";
        } else {
          this.img =
            UploadPath +
            resultData.Photo +
            "?" +
            new Date().Format("yyyyMMddhhmmss");
        }
        this.formData = resultData;
        this.formData.RegionIDList = result.data.RegionIDList;
        this.formData.RegionIDArr = result.data.RegionIDArr;
        this.formData.CustCategoryIDList.splice(0, 0, obj);
        this.formData.EmployeeIDList.splice(0, 0, obj);
        this.dialogVisible = true;
        this.tabs = "first";
      });
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.formData.RegionID =
            this.formData.RegionIDArr.length > 0
              ? this.formData.RegionIDArr[this.formData.RegionIDArr.length - 1]
              : null;
          if (this.checkImg) {
            this.$refs.cropper.getCropData(data => {
              this.formData.Photo = data;
              this.img = data;
              SaveBasCustomerForm(this.formData).then(result => {
                this.dialogVisible = false;
                this.$parent.$parent.$refs.table.$refs.table.GetData();
                this.$refs.ruleForm.resetFields();
              });
            });
          } else {
            SaveBasCustomerForm(this.formData).then(result => {
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
    imgLoad(v) {
      this.checkImg = v === "success";
    },
    changeScale(num) {
      this.$refs.cropper.changeScale(num);
    },
    handleCanle() {
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields();
      this.$refs.cropper.refresh();
      this.checkImg = false;
    },
    handleClose(done) {
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields();
      this.$refs.cropper.refresh();
      this.checkImg = false;
      done();
    },
    startCrop() {
      this.$refs.cropper.startCrop();
    },
    rotateLeft() {
      this.$refs.cropper.rotateRight(); //向右边旋转90度
    },
    rotateRight() {
      this.$refs.cropper.rotateLeft(); //向左边旋转90度
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.img = data;
        } else if (num === 2) {
          //this.example2.img = data;
        }
      };
      // 转化为base64
      reader.readAsDataURL(file);
      // 转化为blob
      //reader.readAsArrayBuffer(file);
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

.el-dialog__wrapper>>>.el-dialog__body {
  padding: 0px 5px;
}

.el-tabs--border-card {
  box-shadow: none;
  border: none;
}

.cropperButton>>>.el-button {
  margin: 10px auto;
}
</style>
