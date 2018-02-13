<template>
  <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline">
    <el-form-item>
      <el-radio-group size="mini" v-model="formInline.ItemType" @change="handleChange">
        <el-radio-button :label="2">大类</el-radio-button>
        <el-radio-button :label="1">小类</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="类别名称">
      <el-input :clearable="true" v-model="formInline.Name" placeholder="类别名称"></el-input>
    </el-form-item>
    <!-- <el-form-item label="商品大类">
      <el-select v-model="formInline.ItemGroupID" placeholder="请选择" @change="handleChange">
        <el-option v-for="item in GroupList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
    <!-- <el-form-item label="商品小类">
      <el-select v-model="formInline.ItemCategoryID" placeholder="请选择">
        <el-option v-for="item in CategoryList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->

    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  FindBasItemGroupList,
  FindBasItemCategoryList
} from "../../../api/api";
export default {
  data() {
    return {
      GroupList: [
        {
          label: "--请选择--",
          value: 0
        }
      ],
      CategoryList: [],
      formInline: {
        Name: "",
        // ItemGroupID: 0,
        // ItemCategoryID: 0,
        ItemType: 2
      },
      nullObj: {
        label: "--请选择--",
        value: 0
      }
    };
  },
  created() {
    //添加空值
    // this.GroupList.splice(0, 0, this.nullObj);
    // this.CategoryList.splice(0, 0, this.nullObj);
    // FindBasItemGroupList().then(result => {
    //   this.GroupList = result.data;
    //   this.GroupList.splice(0, 0, this.nullObj);
    // });
  },
  mounted() {
    this.$parent.$parent.$parent.$parent.$refs.table.$refs.table.conditionData = this.formInline;
    this.$parent.$parent.$parent.$parent.$refs.table.$refs.table.GetData();
  },
  methods: {
    onSubmit() {
      var obj = this.formInline;
      this.$parent.$parent.$parent.$parent.$refs.table.conditionData = obj;
      this.$parent.$parent.$parent.$parent.$refs.table.$refs.table.GetData();
    },
    handleChange(value) {
      this.onSubmit();
      // FindBasItemCategoryList({ ItemGroupID: value }).then(result => {
      //   this.CategoryList = result.data;
      //   this.CategoryList.splice(0, 0, this.nullObj);
      // });
    }
  }
};
</script>
<style scoped lang="scss">
.toolbar .el-form-item {
  margin-bottom: 0;
}
</style>