<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <template #header>
      <div>
        <span class="box-card-title">分店列表</span>
      </div>
    </template>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="分店編號" width="180" />
      <el-table-column prop="name" label="分店名稱" width="180" />
      <el-table-column prop="stoptime" label="截止訂座時間" />
      <el-table-column prop="period" label="訂座時段">
        <template #default="scope">
          <p v-for="(item,index) of tableData[scope.$index].period" :key="index">{{timeFormat(item.split(','))}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="mealTime" label="用餐時間">
        <template #default="scope">
          <p v-for="(item,index) of tableData[scope.$index].mealTime" :key="index">{{MealTimeformatter(item)}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="person" label="用餐人數">
        <template #default="scope">
          <p v-for="(item,index) of tableData[scope.$index].person" :key="index">{{personformatter(item)}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="step" label="間距">
        <template #default="scope">
          <p v-for="(item,index) of tableData[scope.$index].step" :key="index">{{item}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="lastEditTime" label="最後修改時間" />
      <el-table-column label="Operations" fixed="right">
        <template #default="scope">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          </el-col>
          <!-- <el-button size="small" @click="handleDelete(scope.$index, scope.row)">read</el-button> -->
          <el-col :span="4" :offset="5">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
          </el-col>
        </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="default" @click="createNewShop" class="mg10-top">新增分店</el-button>
  </el-card>
</template>
<script>
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import useSetting from "../../mixin/useSetting";
export default {
  name: "shopBookingList",
  setup() {
    let tableData = reactive([]);
    const $router = useRouter();
    const itemKey = "bookingInput";
    const { bookingInput,timeFormat } = useSetting();
    let localData = JSON.parse(localStorage.getItem(itemKey));
    let lastshopid;

    function handleEdit(index, row) {
      $router.push({
        path: "/setting/bookingSetting",
        query: { shopid: row.id },
      });
    }

    function handleDelete(index) {
      tableData.splice(index, 1);
    }
    function MealTimeformatter(val){
      return val.replace(',','')
    }
    function personformatter(val){
      if(!val)return ''
      return val + '位'
    }

    function generateShopID() {
      if (!lastshopid) return "shop001";
      let index = Number(lastshopid.substring(4)) + 1;
      index = index < 10 ? "00" + index : index < 100 ? "0" + index : index;
      lastshopid = "shop" + index;
      return lastshopid;
    }

    function createNewShop() {
      lastshopid = generateShopID();
      const newshop = {
        [lastshopid]: bookingInput
      };
      tableData.push({
        id: lastshopid
      });
      localData = { ...localData, ...newshop };
      localStorage.setItem(itemKey, JSON.stringify(localData));
    }

    function getLocalData() {
      if (localData) {
        for (let [key, value] of Object.entries(localData)) {
          lastshopid = key;
          tableData.push({
            id: key,
            name: value[2]?.value || "",
            stoptime: value[3]?.value || "",
            lastEditTime: value[0]?.value || ""
          });
          for (let i = 4; i < localData[key].length; i++) {
            if (value[i] && value[i].name === "訂座時段" && value[i].children) {
              let last = tableData.length - 1;
              for (let item of value[i].children) {
                let val = item.value === 0 || item.value === [0, 0] ? "" : item.value;
                if (!tableData[last][item.key]) {
                  tableData[last][item.key] = [String(val)];
                } else {
                  tableData[last][item.key].push(String(val));
                }
              }
            }
          }
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
      createNewShop,
      MealTimeformatter,
      timeFormat,
      personformatter
    };
  }
};
</script>
