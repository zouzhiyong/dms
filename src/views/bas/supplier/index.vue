<template>
  <layout>
    <supplierCondition slot="condition" ref="condition"></supplierCondition>
    <supplierTools slot="toolbar"></supplierTools>
    <supplierTable slot="table" ref="table"></supplierTable>
    <supplierForm slot="form" ref="form"></supplierForm>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import supplierTools from "./supplier_tools";
import supplierCondition from "./supplier_condition";
import supplierTable from "./supplier_table";
import supplierForm from "./supplier_form";

export default {
  components: {
    layout,
    supplierTools,
    supplierCondition,
    supplierForm,
    supplierTable
  }
};
</script>