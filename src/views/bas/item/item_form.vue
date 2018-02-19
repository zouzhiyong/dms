<template>
  <el-dialog v-if="dialogVisible" :width="width" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" size="small" :inline="true" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
        <el-tabs type="border-card" value="tab1" @tab-click="handleClick">
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
            <!-- <el-form-item label="基本单位" prop="BaseUOM">
              <el-select v-model="formData.BaseUOM" placeholder="基本单位">
                <el-option v-for="item in formData.UOMList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> -->
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
            <!-- <el-form-item label="销售单位" prop="SalesUOM">
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
            </el-form-item> -->
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
          <el-tab-pane label="单位信息" name="tab3">
            <el-table class="UOM" :data="formData.UOM" border size="mini" style="width: 100%" height="230px">
              <!-- <el-table-column type="index" width="70" align="center" header-align="center">
              </el-table-column> -->
              <el-table-column prop="UomType" width="124" label="单位类型" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-select size="mini" :disabled="true" v-model="scope.row.UomType" popper-class="popper">
                    <el-option v-for="item in formData.UomIDList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="UomID" width="124" label="单位" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="scope.row.UomID" popper-class="popper">
                    <el-option v-for="item in formData.UOMList" :disabled="item.disabled" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="RateQty" label="换算率" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-input-number :controls="false" :disabled="scope.row.UomType==1?true:false" size="mini" v-model="scope.row.RateQty" placeholder="请输入换算倍数" style="width:100%"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column prop="PurchasePrice" label="采购单价" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.PurchasePrice" placeholder="0.00" style="width:100%"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="SalesPrice" label="销售单价" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.SalesPrice" placeholder="0.00" style="width:100%"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="IsPurchaseUOM" label="采购单位" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-switch @change="handleSwitch(scope.row,'IsPurchaseUOM')" v-model="scope.row.IsPurchaseUOM" :active-value="1" :inactive-value="0"></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="IsSalesUOM" label="销售单位" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-switch @change="handleSwitch(scope.row,'IsSalesUOM')" v-model="scope.row.IsSalesUOM" :active-value="1" :inactive-value="0"></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="IsValid" width="70" label="有效否" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.IsValid" :active-value="1" :inactive-value="0"></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="60" align="center" header-align="center">
                <template slot-scope="scope">
                  <span style="width:32px;display:inline-block">
                    <el-button v-if="scope.$index>0 || formData.UOM.length==1" type="text" size="small" icon="el-icon-delete" @click="handleDeleteClick(scope.$index)"></el-button>
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align:center">
              <el-button type="text" icon="el-icon-circle-plus" style="padding: 5px 15px" @click="handleAddUOM">新增</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品照片(封面)" name="tab4">
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
          <el-tab-pane label="商品照片(详细)" name="tab5">
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
      width: "650px",
      UOMObj: {
        ItemID: 0,
        UomID: null,
        RateQty: 1,
        IsValid: 1,
        UomType: 1,
        PurchasePrice: null,
        SalesPrice: null,
        IsPurchaseUOM: 1,
        IsSalesUOM: 1
      },
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
        // if (this.formData.UOM == null) {
        //   let arrTemp = [];
        //   arrTemp.push(this.UOMObj);
        //   this.formData.UOM = arrTemp;
        // }
        //控制不能重复选择
        this.formData.UOMList.map(item => {
          let tempOjb = this.formData.UOM.filter(_item => {
            return _item.UomID == item.value;
          });

          if (tempOjb.length > 0) {
            item.disabled = true;
          } else {
            item.disabled = false;
          }
        });
        //获取单位类型列表
        this.formData.UomIDList = [
          { value: 1, label: "基本单位" },
          { value: 0, label: "扩展单位" }
        ];
        this.formData.ItemGroupIDList.splice(0, 0, this.nullObj);
        this.formData.ItemCategoryIDList.splice(0, 0, this.nullObj);
        this.formData.UOMList.splice(0, 0, this.nullObj);
        this.formData.WarehouseIDList.splice(0, 0, this.nullObj);
        this.dialogVisible = true;
      });
    },
    handleAddUOM() {
      this.formData.UOMList.map(item => {
        let tempOjb = this.formData.UOM.filter(_item => {
          return _item.UomID == item.value;
        });

        if (tempOjb.length > 0) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      });

      let arr = this.formData.UOM.filter(item => {
        return item.UomID == null;
      });

      if (arr.length > 0) {
        this.$message({
          message: "请选择单位",
          type: "warning"
        });
        return;
      }
      //1为基本单位，0为其它单位
      let objTemp = JSON.parse(JSON.stringify(this.UOMObj));

      if (this.formData.UOM.length <= 0) {
        objTemp.UomType = 1;
        objTemp.IsPurchaseUOM = 1;
        objTemp.IsSalesUOM = 1;
      } else {
        objTemp.UomType = 0;
        objTemp.IsPurchaseUOM = 0;
        objTemp.IsSalesUOM = 0;
      }
      objTemp.ItemID = this.formData.ItemID;
      this.formData.UOM.push(objTemp);
    },
    handleDeleteClick(index) {
      this.formData.UOM.splice(index, 1);
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let SaveData = JSON.parse(JSON.stringify(this.formData));
          //获取基本单位
          SaveData.BaseUOM = null;
          SaveData.PurchaseUOM = null;
          SaveData.SalesUOM = null;
          SaveData.UOM.map((item, index) => {
            //将基本单位保存在BaseUOM字段上
            if (item.UomType == 1 && item.UomID != null && item.IsValid == 1) {
              SaveData.BaseUOM = item.UomID;
            }
            //赋值采购单位
            if (item.IsPurchaseUOM == 1) {
              SaveData.PurchaseUOM = item.UomID;
            }
            //赋值销售单位
            if (item.IsSalesUOM == 1) {
              SaveData.SalesUOM = item.UomID;
            }
          });
          if (SaveData.BaseUOM == null) {
            this.$message({
              message: "请选择基本单位",
              type: "warning"
            });
            return;
          }

          if (this.checkImg) {
            this.$refs.cropper.getCropData(data => {
              SaveData.Photo.Picture = data;
              this.img = data;
              SaveBasItemForm(SaveData).then(result => {
                this.dialogVisible = false;
                this.$parent.$parent.$refs.table.$refs.table.GetData();
                this.$refs.ruleForm.resetFields();
              });
            });
          } else {
            SaveBasItemForm(SaveData).then(result => {
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
    handleClick(tab, event) {
      if (tab.paneName == "tab3") {
        this.width = "820px";
      } else {
        this.width = "650px";
      }
    },
    handleSwitch(row, value) {
      this.formData.UOM.map(item => {
        item[value] = 0;
      });
      row[value] = 1;
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
.UOM.el-table>>>.cell {
  line-height: 30px;
}
.UOM.el-table .el-select>>>.el-input {
  width: 104px;
}
.UOM.el-table .el-button--small {
  padding: 5px 10px;
}
</style>