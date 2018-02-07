<template>
  <el-row class="rowbody">
    <el-row>
      <el-form @submit.native.prevent :rules="rules" size="mini" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
        <el-col :span="12">
          <el-form-item label="公司编号" prop="Code">
            <el-input v-model="formData.Code" placeholder="公司编号"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="Name">
            <el-input v-model="formData.Name" placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="Address">
            <el-input v-model="formData.Address" placeholder="地址"></el-input>
          </el-form-item>
          <el-form-item label="地址2" prop="Address2">
            <el-input v-model="formData.Address2" placeholder="地址2"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="Contact">
            <el-input v-model="formData.Contact" placeholder="联系人"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="Tel">
            <el-input v-model="formData.Tel" placeholder="电话"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="Phone">
            <el-input v-model="formData.Phone" placeholder="手机"></el-input>
          </el-form-item>
          <el-form-item label="传真" prop="Fax">
            <el-input v-model="formData.Fax" placeholder="传真"></el-input>
          </el-form-item>
          <el-form-item label="库存账期" prop="InvAccountPeriod">
            <el-input v-model="formData.InvAccountPeriod" placeholder="库存账期"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="Remark">
            <el-input v-model="formData.Remark" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="20px" prop="TradeMark">
            <el-row class="title">
              <el-col :span="8">公司商标</el-col>
              <el-col :span="16" style="color:#606266;font-weight:400;text-align:right">注意：修改后需重新登录后生效</el-col>
            </el-row>
            <vueCropper @imgLoad="imgLoad" ref="cropper" :fixed="option.fixed" :img="img" :autoCrop="option.autoCrop" :fixedNumber="option.fixedNumber" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canScale="option.canScale" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :fixedBox="option.fixedBox" :original="option.original" @realTime="realTime" style="height:300px"></vueCropper>
          </el-form-item>
          <div class="cropperButton">
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
          </div>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <custBotton style="text-align:center;margin-top:10px">
        <el-button slot="saveButton" size="small" type="primary" @click="handleSave">
          <i class="fa fa-floppy-o"></i> 保存</el-button>
      </custBotton>
    </el-row>
  </el-row>
</template>

<script>
import {
  FindBasCompanyForm,
  SaveBasCompanyForm,
  UploadPath
} from "../../../api/api";
import custBotton from "./../../layout/layout_button";
import vueCropper from "vue-cropper";
export default {
  data() {
    return {
      checkImg: false,
      img: "",
      formData: {},
      rules: {
        Name: [{ required: true, message: "公司名称不能为空" }],
        Address: [{ required: true, message: "地址不能为空" }],
        Contact: [{ required: true, message: "联系人不能为空" }],
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
        autoCropWidth: 400,
        autoCropHeight: 120,
        fixedNumber: [400, 120],
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
  created() {
    this.GetData();
  },
  methods: {
    GetData() {
      FindBasCompanyForm().then(result => {
        this.formData = result.data;
        this.img =
          UploadPath +
          result.data.TradeMark +
          "?" +
          new Date().Format("yyyyMMddhhmmss");
      });
    },
    imgLoad(v) {
      this.checkImg = v === "success";
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.checkImg) {
            this.$refs.cropper.getCropData(data => {
              this.formData.TradeMark = data;
              this.img = data;
              SaveBasCompanyForm(this.formData).then(result => {
                this.GetData();
              });
            });
          } else {
            SaveBasCompanyForm(this.formData).then(result => {
              this.GetData();
            });
          }
        } else {
          return false;
        }
      });
    },
    changeScale(num) {
      this.$refs.cropper.changeScale(num);
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
.el-cascader,
.el-input,
.el-input__inner {
  width: 350px;
}
.el-button--mini {
  padding: 7px 7px;
}
.rowbody {
  padding: 5px;
}

.cropperButton {
  margin: 20px;
  text-align: center;
}

.title {
  font-weight: bold;
  height: 25px;
  line-height: 25px;
  padding: 5px;
  box-sizing: content-box;
}
</style>