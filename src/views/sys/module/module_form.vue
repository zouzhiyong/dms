<template>
  <el-dialog v-if="dialogVisible" width="650px" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <span slot="title">{{$route.name}}</span>
    <span>
      <el-form @submit.native.prevent :rules="rules" size="small" :inline="true" ref="ruleForm" :model="formData" label-width='80px' class="demo-form-inline">
        <el-tabs v-model="tabs" type="border-card">
          <el-tab-pane label="基本信息" name="first">
            <el-form-item label="模块编码" prop="Code">
              <el-input v-model="formData.Code" placeholder="模块编码"></el-input>
            </el-form-item>
            <el-form-item label="模块名称" prop="Name">
              <el-input v-model="formData.Name" placeholder="模块名称"></el-input>
            </el-form-item>
            <el-form-item label="上级模块" prop="ParentCode">
              <el-select v-model="formData.ParentCode" placeholder="上级模块">
                <el-option v-for="item in formData.ParentCodeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模块地址" prop="URL">
              <el-input v-model="formData.URL" placeholder="模块地址"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="ICON">
              <el-input v-model="formData.ICON" placeholder="图标"></el-input>
            </el-form-item>
            <el-form-item label="是否菜单" prop="IsMenu">
              <el-switch v-model="formData.IsMenu" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="有效否" prop="IsValid">
              <el-switch v-model="formData.IsValid" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="平台类型" prop="PlatformType">
              <el-select v-model="formData.PlatformType" placeholder="平台类型">
                <el-option v-for="item in formData.PlatformTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="显示顺序" prop="Sequence">
              <el-input v-model="formData.Sequence" placeholder="显示顺序"></el-input>
            </el-form-item>
            <el-form-item label="控件器名称" prop="ControllerName">
              <el-input v-model="formData.ControllerName" placeholder="控件器名称"></el-input>
            </el-form-item>
            <el-form-item label="说明" prop="Descript">
              <el-input v-model="formData.Descript" placeholder="说明"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="按钮设置" name="second">
            <el-checkbox :indeterminate="formData.isIndeterminate" v-model="formData.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="formData.CheckedButtons" @change="handleCheckedButtonChange">
              <el-checkbox v-for="item in formData.Buttons" :label="item.ButtonID" :key="item.ButtonID">{{item.Name}}</el-checkbox>
            </el-checkbox-group>
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
import { FindSysMoudleForm, SaveSysMoudleForm } from "../../../api/api";
import custBotton from "./../../layout/layout_button";
export default {
  data() {
    return {
      tabs: "first",
      dialogVisible: false,
      formData: {},
      rules: {
        Name: [{ required: true, message: "模块名称不能为空" }]
      }
    };
  },
  components: {
    custBotton
  },
  methods: {
    GetData(row) {
      FindSysMoudleForm(row).then(result => {
        result.data.isIndeterminate =
          result.data.CheckedButtons.length > 0 &&
          result.data.CheckedButtons.length < result.data.Buttons.length;
        result.data.checkAll =
          result.data.CheckedButtons.length === result.data.Buttons.length;
        this.formData = result.data;
        this.formData.ParentCodeList.splice(0, 0, {
          label: "无上级",
          value: "&"
        });
        this.dialogVisible = true;
        // this.$refs.ruleForm.resetFields();
        this.tabs = "first";
      });
    },
    handleSave() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          SaveSysMoudleForm(this.formData).then(result => {
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
    },
    handleCheckAllChange(value) {
      let arr = [];
      this.formData.Buttons.map(item => {
        arr.push(item.ButtonID);
      });
      this.formData.CheckedButtons = value ? arr : [];
      this.formData.isIndeterminate = false;
    },
    handleCheckedButtonChange(value) {
      let checkedCount = value.length;
      this.formData.checkAll = checkedCount === this.formData.Buttons.length;
      this.formData.isIndeterminate =
        checkedCount > 0 && checkedCount < this.formData.Buttons.length;
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
</style>