<template>
  <el-tree ref="tree" :data="treeData" :props="defaultProps" node-key="FID" :expand-on-click-node="false" :current-node-key="0" :highlight-current="true" :default-expanded-keys="[0]" @node-click="handleNodeClick"></el-tree>
</template>

<script>
  import { FindSysModuleTree } from "../../../api/api";
  export default {
    data() {
      return {
        treeData: [],
        defaultProps: {
          children: "children",
          label: "label"
        }
      };
    },
    created() {
      this.iniData();
    },
    methods: {
      iniData() {
        var obj = [
        {
          FID: 0,
          Code: "&",
          label: "所有模块",
          children: []
        }];
        FindSysModuleTree().then(result => {
          obj[0].children = result.data;
          this.treeData = obj;
          if (this.treeData.length > 0) {
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(this.treeData[0].FID);
              this.handleNodeClick(this.treeData[0]);
            });
          }
        });
      },
      handleNodeClick(data) {
        this.$parent.$parent.$parent.$parent.$refs.table.$refs.table.conditionData = data;
        this.$parent.$parent.$parent.$parent.$refs.table.$refs.table.GetData();
      }
    }
  };
</script>
<style scoped lang="scss">
  .el-tree {
    height: 100%;
    overflow-y: auto;
  }
</style>