<template>
  <div style="height:100%">
    <el-table :data="tableData" size="small" :highlight-current-row="false" :span-method="objectSpanMethod" ref="table" border height="100%">
      <el-table-column label="一级模块" width="180" header-align="center">
        <template slot-scope="scope">
          <i :class="scope.row.ICON1"></i>
          {{scope.row.Name1}}
          <!-- <el-checkbox :indeterminate="scope.row.isIndeterminate" v-model="scope.row.isMenuRoleParent" @change="handleCheckAllChange(scope.row)">{{scope.row.Name1}}</el-checkbox> -->
        </template>
      </el-table-column>
      <el-table-column label="二级模块" width="180" header-align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isMenuRole">{{scope.row.Name2}}</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="按钮" width="550" header-align="center">
        <template slot-scope="scope">
          <el-checkbox-group v-model="scope.row.ButtonRoles" size="mini">
            <el-checkbox v-for="item in scope.row.chilDren" :label="item.ButtonID" :key="item.ButtonID">{{item.Name}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column label="说明" prop="Descript2" header-align="center">
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
    // checkedData() {
    //   var arr = [];
    //   var buttonArr = [];
    //   var obj = {};
    //   this.tableData.map(item => {
    //     arr = arr.concat(item.MenuRolesData);
    //     if (item.isMenuRole == true || item.isIndeterminate == true) {
    //       arr.push(item.Code);
    //     }
    //     item.chilDren.map(_item => {
    //       _item.chilDren.map(__item => {
    //         let arrTemp = [];
    //         arrTemp = _item.MenuRolesData.filter(filterItem => {
    //           return filterItem == __item.ButtonID;
    //         });
    //         buttonArr.push({
    //           ModButtonID: __item.ModButtonID,
    //           IsVisible: arrTemp.length > 0 ? 1 : 0
    //         });
    //         //console.log(buttonArr);
    //       });
    //     });
    //   });
    //   obj.RightsID = this.conditionData.RightsID;
    //   obj.arr = arr;
    //   obj.buttonArr = buttonArr;
    //   return obj;
    // }
  },
  methods: {
    GetData() {
      var data = this.conditionData;
      FindSysRoleMenuTable(data).then(result => {
        let x = 0;
        let flag = 0;
        result.data.map(item => {
          let arr = result.data.filter(x => {
            return x.isMenuRole == true && item.Code1 == x.ParentCode;
          });
          item.isMenuRoleParent = arr.length > 0 ? true : false;

          if (item.FID1 != flag) {
            flag = item.FID1;
            item.rowspan = result.data.filter(_item => {
              return _item.FID1 == item.FID1;
            }).length;
            item.colspan = 1;
          } else {
            item.rowspan = 0;
            item.colspan = 0;
          }
        });
        this.tableData = result.data;
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan,
          colspan: row.colspan
        };
      }
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
<style scoped>
.el-table {
  height: 100%;
}
.el-table--enable-row-hover>>>.el-table__body tr:hover > td {
  background: #fff;
}
.el-table--small>>>td {
  padding: 3px;
}
.el-checkbox {
  margin-left: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>