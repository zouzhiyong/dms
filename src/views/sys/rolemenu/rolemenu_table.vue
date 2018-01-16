<template>
  <div style="height:100%">
    <el-table :data="tableData" ref="table" border height="100%">
      <el-table-column type="index" width="100" header-align="center" align="center">
      </el-table-column>
      <el-table-column label="一级模块" width="180" header-align="center">
        <template slot-scope="scope">
          <i :class="scope.row.ICON"></i>
          <el-checkbox :indeterminate="scope.row.isIndeterminate" v-model="scope.row.isMenuRole" @change="handleCheckAllChange(scope.row)">{{scope.row.Name}}</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="二级模块" width="550" header-align="center">
        <template slot-scope="scope">
          <el-checkbox-group v-model="scope.row.MenuRolesData" @change="handleCheckedDataChange(scope.row)">
            <el-row v-for="item in scope.row.chilDren" :label="item.Code" :key="item.Code">
              <el-col :span="6">
                <el-checkbox :label="item.Code" :key="item.Code">{{item.Name}}</el-checkbox>
              </el-col>
              <el-col :span="18">
                <el-button size="mini">超小按钮</el-button>
                <el-button size="mini">超小按钮</el-button>
                <el-button size="mini">超小按钮</el-button>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column label="说明" prop="Descript" header-align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { FindSysRoleMenuTable } from "../../../api/api";
export default {
  data() {
    return {
      tableData: [],
      conditionData: {}
    };
  },
  computed: {
    checkedData() {
      var arr = [];
      var obj = {};
      this.tableData.map(item => {
        arr = arr.concat(item.MenuRolesData);
        if (item.isMenuRole == true || item.isIndeterminate == true) {
          arr.push(item.Code);
        }
      });

      obj.RightsID = this.conditionData.RightsID;
      obj.arr = arr;
      return obj;
    }
  },
  methods: {
    GetData() {
      var data = this.conditionData;
      FindSysRoleMenuTable(data).then(result => {
        result.data.map(item => {
          item.isMenuRole = item.MenuRolesData.length > 0 ? true : false;
          item.isIndeterminate =
            item.MenuRolesData.length > 0 &&
            item.MenuRolesData.length < item.chilDren.length;
        });
        this.tableData = result.data;
      });
    },
    handleCheckAllChange(row) {
      var tempArr = [];
      row.chilDren.map(item => {
        tempArr.push(item.Code);
      });
      row.MenuRolesData = row.isMenuRole ? tempArr : [];
      row.isIndeterminate = false;
    },
    handleCheckedDataChange(row) {
      let checkedCount = row.MenuRolesData.length;
      row.isMenuRole = checkedCount === row.chilDren.length;
      row.isIndeterminate =
        checkedCount > 0 && checkedCount < row.chilDren.length;
    }
  }
};
</script>
<style scoped lang="scss">
.el-table {
  height: 100%;
}

.el-checkbox {
  margin-left: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>