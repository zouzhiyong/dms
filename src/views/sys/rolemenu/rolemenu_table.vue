<template>
  <div style="height:100%">
    <el-table :data="tableData" size="small" :highlight-current-row="false" :span-method="objectSpanMethod" ref="table" border height="100%">
      <el-table-column label="一级模块" width="180" header-align="center">
        <template slot-scope="scope">
          <i :class="scope.row.ICON1"></i>
          <!-- {{scope.row.Name1}} -->
          <el-checkbox :indeterminate="scope.row.isIndeterminate" v-model="scope.row.isMenuRoleParent" @change="x=>{handleCheckAllChange(x,scope.row)}">{{scope.row.Name1}}</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="二级模块" width="180" header-align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isMenuRole" @change="x=>handleCheckedDataChange(x,scope.row)">{{scope.row.Name2}}</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="按钮" width="400" header-align="center">
        <template slot-scope="scope">
          <el-checkbox-group :disabled="!scope.row.isMenuRole" v-model="scope.row.ButtonRoles" size="mini">
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
            let checkedCount = result.data.filter(x => {
              return x.isMenuRole == true && item.Code1 == x.ParentCode;
            }).length;

            if (item.FID1 != flag) {
              flag = item.FID1;
              let arrCount = result.data.filter(_item => {
                return _item.FID1 == item.FID1;
              }).length;
              item.rowspan = arrCount;
              item.colspan = 1;
            } else {
              item.rowspan = 0;
              item.colspan = 0;
            }
            //判断一级菜单下面的二级菜单是否全选
            item.isMenuRoleParent = item.rowspan === checkedCount;
            //判断样式，全选为false，非全选为true
            item.isIndeterminate = checkedCount > 0 && checkedCount < item.rowspan;

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
      handleCheckAllChange(value, row) {
        this.tableData.map(item => {
          if (item.ParentCode == row.Code1) {
            //判断一级菜单下面的二级菜单是否全选
            item.isMenuRole = value;
            //判断样式
            item.isIndeterminate = false;
          }
        })
      },

      handleCheckedDataChange(value, row) {
        let checkedCount = this.tableData.filter(x => {
          return x.isMenuRole == true && row.ParentCode == x.ParentCode;
        }).length;

        let arrCount = this.tableData.filter(_item => {
          return _item.FID1 == row.FID1;
        }).length;

        this.tableData.map(item => {
          if (item.Code1 == row.ParentCode) {
            //判断一级菜单下面的二级菜单是否全选
            item.isMenuRoleParent = checkedCount === arrCount;
            //判断样式，全选为false，非全选为true
            item.isIndeterminate = checkedCount > 0 && checkedCount < arrCount;
          }
        })

        //处理对应BUTTON的权限
        let arr = [];
        row.chilDren.filter(item => {
          arr.push(item.ButtonID)
        })
        row.ButtonRoles = value ? arr : [];
      }
    }
  };
</script>
<style scoped>
  .el-table {
    height: 100%;
  }

  .el-table--enable-row-hover>>>.el-table__body tr:hover>td {
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