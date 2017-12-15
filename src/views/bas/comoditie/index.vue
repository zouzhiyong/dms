<template>
  <layout>
    <comoditieTools slot="toolbar"></comoditieTools>
    <comoditieTree slot="tree"></comoditieTree>
    <comoditieTable slot="table" ref="table"></comoditieTable>
    <comoditieForm slot="form" ref="form"></comoditieForm>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import comoditieTools from "./comoditie_tools";
import comoditieTree from "./comoditie_tree";
import comoditieTable from "./comoditie_table";
import comoditieForm from "./comoditie_form";

export default {
  components: {
    layout,
    comoditieTools,
    comoditieForm,
    comoditieTree,
    comoditieTable
  }
};
</script>