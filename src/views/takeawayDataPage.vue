<template>
  <loading v-if="isLoading"></loading>
  <div :style="{opacity:isLoading===true?0:100}">
    <div class="page-header">
      <el-card :body-style="{ padding:'5px'}">
        <div class="page-header-box">
          <div class="liquid-chart box-card-liquid-subtitle">
            <liquidChart ref="dumpBillChart" name="dumpBill" title="甩單數量百分比"></liquidChart>
            <liquidChart ref="dumpBillVolumChart" name="dumpBillVolum" title="損失金額百分比"></liquidChart>
          </div>
          <textChart title="本月訂單總額" :sales="totalSalesMonth"></textChart>
          <textChart title="本月成交總額" :sales="totalSalesMonthInPay"></textChart>
        </div>
      </el-card>
    </div>

    <div class="page-gird">
      <chart
        ref="salesVolumeChart"
        name="salesVolume"
        title="外賣銷量"
        :chartIndex="0"
        @updateChartView="assumbleRequestHistoryMSG"
      ></chart>

      <tableChart title="本月十大人氣產品" :tableData="popularProduct"></tableChart>
    </div>
  </div>
</template>
<script>
import { getHistoryMsg} from "../util/require";
import { onMounted, ref } from "vue";
import chart from "../components/echart";
import liquidChart from "../components/liquidChart";
import textChart from "../components/textChart";
import tableChart from "../components/table";
import loading from "../components/loading";
export default {
  components: {
    chart,
    liquidChart,
    textChart,
    tableChart,
    loading
  },
  setup() {
    const salesVolumeChart = ref(null);
    const dumpBillChart = ref(null);
    const dumpBillVolumChart = ref(null);
    let totalSalesMonth = ref(0);
    let totalSalesMonthInPay = ref(0);
    let popularProduct = ref([]);
    let isLoading = ref(true);

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
      dumpBillChart.value.drawChart(rate);
      dumpBillVolumChart.value.drawChart(lostvolumeRate);
      getPopularProduct(historyMsgInPay);
      salesVolumeChart.value.drawChart([historyMsg, historyMsgInPay]);
      isLoading.value = false;
    }

    function getPopularProduct(data) {
      let filterObj = {};
      data.forEach(item => {
        let len = item.attachments.length;
        for (let i = 1; i < len - 2; i++) {
          item.attachments[i].fields.forEach(product => {
            let target = product.value.split(" ");
            let key = target[0];
            let value = Number(target[1].match(/[0-9]*/));
            if (!filterObj[key]) {
              filterObj[key] = {
                key,
                value
              };
            } else {
              filterObj[key].value += value;
            }
          });
        }
      });
      popularProduct.value = Object.values(filterObj)
        .sort((a, b) => b.value - a.value)
        .splice(0, 11);
      popularProduct.value.forEach(item => {
        item.value = item.value + "份";
      });
      // console.log(filterObj)
      // console.log(Object.values(filterObj))
    }
    function moneyAmountFromatter(item) {
      return parseInt(
        item.attachments[item.attachments.length - 1].pretext.slice(4)
      );
    }

    async function assumbleRequestHistoryMSG(option){
      let [historyMsg, historyMsgInPay] = await getHistoryMsg({
        shop: option.shop,
        range: option.range,
      });
      await drawChart(historyMsg, historyMsgInPay)
    }

    onMounted(async () => {
      assumbleRequestHistoryMSG({
        shop: "616-土瓜灣店",
        range: "month",
      })
    });

    return {
      isLoading,
      salesVolumeChart,
      dumpBillChart,
      dumpBillVolumChart,
      totalSalesMonth,
      totalSalesMonthInPay,
      assumbleRequestHistoryMSG,
      popularProduct
    };
  }
};
</script>
<style scoped>
.title {
  padding-left: 5px;
  padding-bottom: 5px;
}
</style>