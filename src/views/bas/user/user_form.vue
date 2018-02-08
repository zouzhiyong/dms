<template>
  <el-dialog v-if="dialogVisible" width="650px" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" size="small" :inline="true" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
        <el-tabs v-model="tabs" type="border-card">
          <el-tab-pane label="基本信息" name="first">
            <el-form-item label="账号" prop="Code">
              <el-input v-model="formData.Code" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="Name">
              <el-input v-model="formData.Name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="职员类型" prop="UserCategoryID">
              <el-select v-model="formData.UserCategoryID" placeholder="职员类型">
                <el-option v-for="item in formData.UserCategoryIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位" prop="PositionID">
              <el-select v-model="formData.PositionID" placeholder="职位">
                <el-option v-for="item in formData.PositionIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色名称" prop="RightsID">
              <el-select v-model="formData.RightsID" placeholder="角色名称">
                <el-option v-for="item in formData.RightsIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门" prop="DeptID">
              <el-select v-model="formData.DeptID" placeholder="部门">
                <el-option v-for="item in formData.DeptIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对应上级" prop="ParentEmpID">
              <el-select v-model="formData.ParentEmpID" placeholder="对应上级">
                <el-option v-for="item in formData.ParentEmpIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码" prop="Phone">
              <el-input v-model="formData.Phone" placeholder="电话号码"></el-input>
            </el-form-item>
            <el-form-item label="有效否" prop="IsValid">
              <el-switch v-model="formData.IsValid" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <!-- <el-form-item label="是否锁定" prop="IsLockedout">
              <el-switch v-model="formData.IsLockedout" :active-value="0" :inactive-value="1"></el-switch>
            </el-form-item> -->

            <el-form-item label="使用系统" prop="IsUseSystem">
              <el-switch v-model="formData.IsUseSystem" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="备注" prop="Remark">
              <el-input v-model="formData.Remark" placeholder="备注" style="width:495px;"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="其它信息" name="second">
            <el-form-item label="证件类型" prop="CertificateID">
              <el-select v-model="formData.CertificateID" placeholder="证件类型">
                <el-option v-for="item in formData.CertificateIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="CertificateNumber">
              <el-input v-model="formData.CertificateNumber" placeholder="证件号码"></el-input>
            </el-form-item>
            <el-form-item label="坐机号码" prop="Tel">
              <el-input v-model="formData.Tel" placeholder="坐机号码"></el-input>
            </el-form-item>

            <el-form-item label="Email" prop="Email">
              <el-input v-model="formData.Email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop="QQ">
              <el-input v-model="formData.QQ" placeholder="QQ"></el-input>
            </el-form-item>
            <el-form-item label="WeiXin" prop="WeiXin">
              <el-input v-model="formData.WeiXin" placeholder="WeiXin"></el-input>
            </el-form-item>
            <el-form-item label="手机串号" prop="IMEICode">
              <el-input v-model="formData.IMEICode" placeholder="手机串号"></el-input>
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
import { FindBasUserForm, SaveBasUserForm, UploadPath } from "../../../api/api";
import custBotton from "./../../layout/layout_button";
import vueCropper from "vue-cropper";
export default {
  data() {
    return {
      checkImg: false,
      img: "",
      tabs: "first",
      dialogVisible: false,
      formData: {},
      rules: {
        Code: [{ required: true, message: "账号不能为空" }],
        Name: [{ required: true, message: "名称不能为空" }],
        Email: [{ type: "email", message: "请输入正确的邮箱地址" }],
        UserCategoryID: [{ required: true, message: "职员类型不能为空" }],
        PositionID: [{ required: true, message: "职位不能为空" }],
        Phone: [{ required: true, message: "手机号码不能为空" }]
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
      FindBasUserForm(row).then(result => {
        let obj = {
          label: "--请选择--",
          value: 0
        };
        if (row.UserID == 0) {
          this.img = "";
        } else {
          this.img =
            UploadPath +
            result.data.Photo +
            "?" +
            new Date().Format("yyyyMMddhhmmss");
        }
        this.formData = result.data;
        this.formData.DeptIDList.splice(0, 0, obj);
        this.formData.UserCategoryIDList.splice(0, 0, obj);
        this.formData.PositionIDList.splice(0, 0, obj);
        this.formData.RightsIDList.splice(0, 0, obj);
        this.formData.ParentEmpIDList.splice(0, 0, obj);
        this.formData.CertificateIDList.splice(0, 0, obj);
        this.dialogVisible = true;
        this.tabs = "first";
      });
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.checkImg) {
            this.$refs.cropper.getCropData(data => {
              this.formData.Photo = data;
              this.img = data;
              SaveBasUserForm(this.formData).then(result => {
                this.dialogVisible = false;
                this.$parent.$parent.$refs.table.$refs.table.GetData();
                this.$refs.ruleForm.resetFields();
              });
            });
          } else {
            SaveBasUserForm(this.formData).then(result => {
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