<template>
<el-card shadow="always" :body-style="{ padding: '20px' }">
  <template #header>
  <div>
    <span class='box-card-title'>分店列表</span>
  </div>
  </template>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="分店編號" width="180" />
    <el-table-column prop="name" label="分店名稱" width="180" />
    <el-table-column prop="stoptime" label="截止訂座時間" />
    <el-table-column prop="lastEditTime" label="最後修改時間" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="small" @click="handleDelete(scope.$index, scope.row)">read</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" size="default" @click="createNewShop" class="mg10-top">新增分店</el-button>
  </el-card>
</template>
<script>
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
export default {
  name: "shopBookingList",
  setup() {
    let tableData = reactive([]);
    const $router = useRouter();
    let lastshopid

    function handleEdit(index, row) {
      $router.push({
        path: "/setting/bookingSetting",
        query: { shopid: row.id }
      });
    }

    function handleDelete(index) {
      tableData.splice(index,1)
    }

    function generateShopID(){
      if(!lastshopid) return 'shop001';
      let index = Number(lastshopid.substring(4)) + 1;
      index = index < 10 ? '00' + index : index < 100 ? '0' + index : index;
      lastshopid = 'shop' + index
      return lastshopid
    }

    function createNewShop(){
      tableData.push({
          id: generateShopID(),
          name: "",
          stoptime:"",
          lastEditTime:""
      })
    }

    function getLocalData() {
      let localData = JSON.parse(localStorage.getItem("bookingInput"));
      if(localData){
        for (let [key, value] of Object.entries(localData)) {
          lastshopid = key;
          tableData.push({
            id: key,
            name: value[2].value,
            stoptime:value[3].value,
            lastEditTime:value[0].value
          });
        }
      }
    }

    onMounted(() => {
      getLocalData();
    });

    return {
      handleEdit,
      handleDelete,
      tableData,
      generateShopID,
      createNewShop
    };
  }
};
</script>
