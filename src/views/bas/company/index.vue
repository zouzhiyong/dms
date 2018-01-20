<template>
  <layout>
    <companyForm slot="form" ref="form"></companyForm>
  </layout>
</template>

<script>
import layout from "./../../layout/layout_left_right";
import companyForm from "./company_form";

export default {
  components: {
    layout,
    companyForm
  }
};
</script>

<style scoped>
.body {
  width: 1000px;
  margin: auto;
  overflow: auto;
}
</style>
