<template>
  <el-card class="box-card">
    <template #header>
      <h3 class="box-card-title">{{title}}</h3>
    </template>
    <el-table :data="tableData" style="width: 100%" max-height="280" :show-header="false">
      <el-table-column type="index" :index="indexMethod(1)" />
      <el-table-column prop="key" label="產品" />
      <el-table-column prop="value" label="銷量" />
    </el-table>
  </el-card>
</template>
<script>
export default {
  props: {
    title: String,
    tableData: Array
  },
  setup() {
    const indexMethod = (index) => {
      return index++;
    };

    return {
      indexMethod
    };
  }
};
</script>
<style>
</style>