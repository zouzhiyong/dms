<template>
  <el-dialog v-if="dialogVisible" width="650px" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" size="small" :inline="true" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
        <el-tabs type="border-card" value="tab1">
          <el-tab-pane label="基本信息" name="tab1">
            <el-form-item label="商品编码" prop="Code">
              <el-input v-model="formData.Code" placeholder="商品编码"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="Name">
              <el-input v-model="formData.Name" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品简称" prop="ShortName">
              <el-input v-model="formData.ShortName" placeholder="商品简称"></el-input>
            </el-form-item>
            <el-form-item label="商品大类" prop="ItemGroupID">
              <el-select v-model="formData.ItemGroupID" placeholder="商品大类" @change="handleChange">
                <el-option v-for="item in formData.ItemGroupIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品小类" prop="ItemCategoryID">
              <el-select v-model="formData.ItemCategoryID" placeholder="商品小类">
                <el-option v-for="item in formData.ItemCategoryIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品条码" prop="Barcode">
              <el-input v-model="formData.Barcode" placeholder="商品条码"></el-input>
            </el-form-item>
            <el-form-item label="对应仓库" prop="WarehouseID">
              <el-select v-model="formData.WarehouseID" placeholder="对应仓库">
                <el-option v-for="item in formData.WarehouseIDList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="基本单位" prop="BaseUOM">
              <el-select v-model="formData.BaseUOM" placeholder="基本单位">
                <el-option v-for="item in formData.UOMList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有效期" prop="Period">
              <el-input v-model.number="formData.Period" placeholder="有效期"></el-input>
            </el-form-item>
            <el-form-item label="安全库存" prop="SaveInventory">
              <el-input v-model="formData.SaveInventory" placeholder="安全库存"></el-input>
            </el-form-item>
            <el-form-item label="有效否" prop="IsValid">
              <el-switch v-model="formData.IsValid" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="其它信息" name="tab2">
            <el-form-item label="销售单位" prop="SalesUOM">
              <el-select v-model="formData.SalesUOM" placeholder="销售单位">
                <el-option v-for="item in formData.UOMList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="采购单位" prop="PurchaseUOM">
              <el-select v-model="formData.PurchaseUOM" placeholder="采购单位">
                <el-option v-for="item in formData.UOMList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="采购价" prop="PurchasePrice">
              <el-input v-model.number="formData.PurchasePrice" placeholder="采购价"></el-input>
            </el-form-item>
            <el-form-item label="销售价" prop="SalesPrice">
              <el-input v-model.number="formData.SalesPrice" placeholder="销售价"></el-input>
            </el-form-item>
            <el-form-item label="长度" prop="Length">
              <el-input v-model.number="formData.Length" placeholder="长度"></el-input>
            </el-form-item>
            <el-form-item label="宽度" prop="Width">
              <el-input v-model.number="formData.Width" placeholder="宽度"></el-input>
            </el-form-item>
            <el-form-item label="高度" prop="Height">
              <el-input v-model.number="formData.Height" placeholder="高度"></el-input>
            </el-form-item>
            <el-form-item label="毛重" prop="CrossWeigth">
              <el-input v-model.number="formData.CrossWeigth" placeholder="毛重"></el-input>
            </el-form-item>
            <el-form-item label="体积" prop="Size">
              <el-input v-model.number="formData.Size" placeholder="体积"></el-input>
            </el-form-item>
            <el-form-item label="最后成本" prop="LastCost">
              <el-input v-model.number="formData.LastCost" placeholder="最后成本"></el-input>
            </el-form-item>
            <el-form-item label="批次管理" prop="IsBatch">
              <el-switch v-model="formData.IsBatch" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="可销售否" prop="IsForSale">
              <el-switch v-model="formData.IsForSale" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="库存零价值" prop="IsZeroValue">
              <el-switch v-model="formData.IsZeroValue" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品照片(封面)" name="tab3">
            <el-col style="width:480px">
              <el-form-item prop="Photo.Picture">
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
          <el-tab-pane label="商品照片(详细)" name="tab4">
            <!-- <el-upload ref="upload" class="upload-demo" multiple :limit="3" :on-exceed="handleExceed" :headers="headers" accept="image/png,image/jpeg" action="/WebAppDms/api/customer/ImgUpload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
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
  FindBasItemForm,
  FindBasItemGroupCategoryForm,
  SaveBasItemForm,
  UploadPath
} from "../../../api/api";
import custBotton from "./../../layout/layout_button";
import vueCropper from "vue-cropper";
export default {
  data() {
    return {
      nullObj: {
        label: "--请选择--",
        value: null
      },
      dialogVisible: false,
      formData: {},
      rules: {
        Name: [{ required: true, message: "商品名称不能为空" }],
        ItemGroupID: [{ required: true, message: "大类不能为空" }],
        PurchasePrice: [{ type: "number", message: "格式不对" }],
        Period: [{ type: "number", message: "格式不对" }],
        SalesPrice: [{ type: "number", message: "格式不对" }],
        Length: [{ type: "number", message: "格式不对" }],
        Width: [{ type: "number", message: "格式不对" }],
        Height: [{ type: "number", message: "格式不对" }],
        CrossWeigth: [{ type: "number", message: "格式不对" }],
        Size: [{ type: "number", message: "格式不对" }],
        LastCost: [{ type: "number", message: "格式不对" }]
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
      checkImg: false,
      img: "",
      previews: {}
    };
  },
  components: {
    custBotton,
    vueCropper
  },
  methods: {
    GetData(row) {
      FindBasItemForm(row).then(result => {
        if (result.data.Photo == null) {
          result.data.Photo = {
            IsTitle: "",
            PicID: 0,
            Type: 0,
            IsValid: 1,
            Picture: ""
          };
        }
        if (row.ItemID == 0) {
          this.img = "";
        } else {
          this.img =
            UploadPath +
            result.data.Photo.Picture +
            "?" +
            new Date().Format("yyyyMMddhhmmss");
        }
        this.formData = result.data;
        this.formData.ItemGroupIDList.splice(0, 0, this.nullObj);
        this.formData.ItemCategoryIDList.splice(0, 0, this.nullObj);
        this.formData.UOMList.splice(0, 0, this.nullObj);
        this.formData.WarehouseIDList.splice(0, 0, this.nullObj);
        this.dialogVisible = true;
      });
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.checkImg) {
            this.$refs.cropper.getCropData(data => {
              this.formData.Photo.Picture = data;
              this.img = data;
              SaveBasItemForm(this.formData).then(result => {
                this.dialogVisible = false;
                this.$parent.$parent.$refs.table.$refs.table.GetData();
                this.$refs.ruleForm.resetFields();
              });
            });
          } else {
            SaveBasItemForm(this.formData).then(result => {
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
    handleChange(value) {
      FindBasItemGroupCategoryForm({ ItemGroupID: value }).then(result => {
        this.formData.ItemCategoryID = null;
        this.formData.ItemCategoryIDList = result.data;
        this.formData.ItemCategoryIDList.splice(0, 0, this.nullObj);
      });
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
    dialogClose() {
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

.cropperButton>>>.el-button {
  margin: 10px auto;
}
</style>