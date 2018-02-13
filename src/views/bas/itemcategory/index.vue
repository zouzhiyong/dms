<template>
  <layout>
    <itemcategoryCondition slot="condition" ref="condition"></itemcategoryCondition>
    <itemcategoryTools slot="toolbar"></itemcategoryTools>
    <itemcategoryTable slot="table" ref="table"></itemcategoryTable>
    <itemcategoryForm slot="form" ref="form"></itemcategoryForm>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import itemcategoryTools from "./itemcategory_tools";
import itemcategoryCondition from "./itemcategory_condition";
import itemcategoryTable from "./itemcategory_table";
import itemcategoryForm from "./itemcategory_form";

export default {
  components: {
    layout,
    itemcategoryTools,
    itemcategoryCondition,
    itemcategoryForm,
    itemcategoryTable
  }
};
</script>