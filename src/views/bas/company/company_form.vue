<template>
  <el-row class="rowbody">
    <el-row>
      <el-col :span="12">
        <el-form @submit.native.prevent :rules="rules" size="small" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
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
            <el-input v-model="formData.Address" placeholder="地址2"></el-input>
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
        </el-form>
      </el-col>
      <el-col :span="12">
        <vueCropper ref="cropper" :fixed="option.fixed" :img="option.img" :autoCrop="true" :fixedNumber="option.fixedNumber" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :fixedBox="option.fixedBox" :original="option.original" @realTime="realTime" style="height:300px"></vueCropper>
        <div class="cropperButton">
          <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
          <label class="el-button el-button--primary el-button--small" for="uploads">上传
            <i class="el-icon-upload el-icon--right"></i>
          </label>
          <button @click="rotateLeft" class="el-button el-button--primary el-button--small">向左旋转90度</button>
          <button @click="rotateRight" class="el-button el-button--primary el-button--small">向右旋转90度</button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <custBotton style="text-align:center">
        <el-button slot="saveButton" size="small" type="primary" @click="handleSave">保存</el-button>
      </custBotton>
    </el-row>
  </el-row>
</template>

<script>
// import { FindSysRoleForm, SaveSysRoleForm } from "../../../api/api";
import custBotton from "./../../layout/layout_button";
import vueCropper from "vue-cropper";
export default {
  data() {
    return {
      formData: {},
      rules: {
        Name: [{ required: true, message: "公司名称不能为空" }],
        Address: [{ required: true, message: "地址不能为空" }],
        Contact: [{ required: true, message: "联系人不能为空" }],
        Phone: [{ required: true, message: "手机号码不能为空" }]
      },
      lists: [
        {
          img: "https://fengyuanchen.github.io/cropper/images/picture.jpg"
        },
        {
          img: "http://ofyaji162.bkt.clouddn.com/touxiang.jpg"
        }
      ],
      option: {
        img: "",
        size: 1,
        full: true,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCropWidth: 300,
        autoCropHeight: 200,
        fixedNumber: [300, 200],
        fixed: true
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
      FindSysRoleForm(row).then(result => {
        this.formData = result.data;
        this.dialogVisible = true;
      });
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          SaveSysRoleForm(this.formData).then(result => {
            this.dialogVisible = false;
            this.$parent.$parent.$refs.table.$refs.table.GetData();
            this.$refs.ruleForm.resetFields();
          });
        } else {
          return false;
        }
      });
    },
    rotateLeft() {
      this.$refs.cropper.rotateRight(); //向右边旋转90度
    },
    rotateRight() {
      this.$refs.cropper.rotateLeft(); //向左边旋转90度
    },
    changeImg() {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img;
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
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
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
.rowbody {
  padding: 30px;
}
.cropperButton {
  margin: 20px;
  text-align: center;
}
</style>