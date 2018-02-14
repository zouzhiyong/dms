<template>
  <layout>
    <itemTools slot="toolbar"></itemTools>
    <itemTree slot="tree"></itemTree>
    <itemTable slot="table" ref="table"></itemTable>
    <itemForm slot="form" ref="form"></itemForm>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import itemTools from "./item_tools";
import itemTree from "./item_tree";
import itemTable from "./item_table";
import itemForm from "./item_form";

export default {
  components: {
    layout,
    itemTools,
    itemForm,
    itemTree,
    itemTable
  }
};
</script>