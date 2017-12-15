<template>
  <el-tree ref="tree" :data="treeData" :props="defaultProps" node-key="TypeID" :current-node-key="0" :expand-on-click-node="false" :highlight-current="true" :default-expanded-keys="[0]" @node-click="handleNodeClick"></el-tree>
</template>

<script>
import { FindBasComoditieTypeTree } from "../../../api/api";
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
          TypeID: 0,
          label: "所有类别",
          children: []
        }
      ];
      FindBasComoditieTypeTree().then(result => {
        obj[0].children = result.data;
        this.treeData = obj;
        if (this.treeData.length > 0) {
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.treeData[0].TypeID);
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
