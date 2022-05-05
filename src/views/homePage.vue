<template>
  <loading v-if="isLoading"></loading>
  <div v-show="!isLoading">
    <el-row :gutter="20" class="pd5">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :offset="0">
        <el-select v-model="functionBlock" multiple placeholder="自定義展示模塊" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>

    <div class="page-gird">
      <el-card :body-style="{ padding:'5px'}" class="item1" v-show="functionBlock.includes('takeawayPreview')">
        <div class="page-header-box">
          <div class="liquid-chart box-card-liquid-subtitle">
            <liquidChart ref="dumpBillChart" name="dumpBill" title="甩單數量百分比"></liquidChart>
            <liquidChart ref="dumpBillVolumChart" name="dumpBillVolum" title="損失金額百分比"></liquidChart>
          </div>
          <textChart title="本月訂單總額" :sales="totalSalesMonth"></textChart>
          <textChart title="本月成交總額" :sales="totalSalesMonthInPay"></textChart>
        </div>
      </el-card>
      <shopBookingList class="item1" v-show="functionBlock.includes('shopBookingList')"></shopBookingList>
    </div>
  </div>
  
</template>
<script>
import { ref, onMounted } from "vue";
import { getHistoryMsg } from "../util/require";
import liquidChart from "../components/liquidChart";
import textChart from "../components/textChart";
import loading from "../components/loading";
import shopBookingList from "./setting/shopBookingList.vue";
export default {
    components: {
    liquidChart,
    textChart,
    loading,
    shopBookingList
  },
  setup() {
    const dumpBillVolumChart = ref(null);
    const dumpBillChart = ref(null);
    let totalSalesMonth = ref(0);
    let totalSalesMonthInPay = ref(0);
    let isLoading = ref(true);
    const functionBlock = ref([]);
    const options = [
      {
        value: "takeawayPreview",
        label: "外賣訂單數據預覽"
      },
      {
        value: "shopBookingList",
        label: "訂座時段管理"
      }
    ];

    function drawChart(historyMsg, historyMsgInPay) {
      let rate = 0;
      let lostvolumeRate = 0;
      historyMsg.forEach(
        item => (totalSalesMonth.value += moneyAmountFromatter(item))
      );
      historyMsgInPay.forEach(
        item => (totalSalesMonthInPay.value += moneyAmountFromatter(item))
      );
      rate = (1 - historyMsgInPay.length / historyMsg.length || 0).toFixed(2);
      lostvolumeRate = (
        (totalSalesMonth.value - totalSalesMonthInPay.value) /
        totalSalesMonth.value
      ).toFixed(2);
      console.log(dumpBillChart)
      dumpBillChart.value.drawChart(rate);
      dumpBillVolumChart.value.drawChart(lostvolumeRate);
      isLoading.value = false;
    }

    function moneyAmountFromatter(item) {
      return parseInt(
        item.attachments[item.attachments.length - 1].pretext.slice(4)
      );
    }

    onMounted(async () => {
      let [historyMsg, historyMsgInPay] = await getHistoryMsg({
        shop: "616-土瓜灣店",
        range: "month"
      });
      await drawChart(historyMsg, historyMsgInPay);
    });

    return {
      isLoading,
      dumpBillChart,
      dumpBillVolumChart,
      totalSalesMonth,
      totalSalesMonthInPay,
      functionBlock,
      options
    };
  }
};
</script>
<style scoped>
.item1{
  grid-column-start: span 2;
}
</style>