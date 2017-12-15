<template>
  <layout>
    <Tools slot="toolbar"></Tools>
    <Table slot="table" ref="table"></Table>
    <Form slot="form" ref="form"></Form>
  </layout>
</template>

<script>
  import layout from "./../../layout/layout_left_right";
  import Tools from "./comoditietype_tools";
  import Table from "./comoditietype_table";
  import Form from "./comoditietype_form";

  export default {
    components: {
      layout,
      Tools,
      Form,
      Table
    }
  };
</script>