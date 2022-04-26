<template>
  <loading v-if="isLoading"></loading>
  <div :style='{opacity:isLoading===true?0:100}'>
    <div class="page-header" >
      <el-card :body-style="{ padding:'5px'}">

        <div class="page-header-box">
          <div class="liquid-chart box-card-liquid-subtitle">
            <liquidChart ref="dumpBill" name="dumpBill" title="甩單數量百分比"></liquidChart>
            <liquidChart ref="dumpBillVolum" name="dumpBillVolum" title="損失金額百分比"></liquidChart>
          </div>
          <textChart title="本月訂單總額" :sales="totalSalesMonth"></textChart>
          <textChart title="本月成交總額" :sales="totalSalesMonthInPay"></textChart>
        </div>
      </el-card>
    </div>

    <div class="page-gird">
      <chart
        ref="salesVolume"
        name="salesVolume"
        title="外賣銷量"
        :chartIndex="0"
        @updateChartView="getHistoryMsg"
      ></chart>

      <tableChart title="本月十大人氣產品" :tableData="popularProduct"></tableChart>
    </div>
  </div>
</template>
<script>
import { slack } from "../util/require";
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
    const salesVolume = ref(null);
    const dumpBill = ref(null);
    const dumpBillVolum = ref(null);
    let totalSalesMonth = ref(0);
    let totalSalesMonthInPay = ref(0);
    let channelsList = {};
    let popularProduct = ref([]);
    let isLoading = ref(true);

    function getTimeStamp(flag) {
      let startTime;
      let time = new Date();
      if (flag === "month") {
        time.setDate(1);
      } else {
        time.setDate(time.getDate() - time.getDay());
      }
      time.setHours(0);
      startTime = time.getTime() + "000";
      startTime = startTime.slice(0, 10) + "." + startTime.slice(10);
      return startTime;
    }

    async function getChannelsList() {
      await slack.get("/conversations.list").then(res => {
        res.data.channels.forEach(item => {
          channelsList[item.name] = item.id;
        });
      });
    }

    async function getHistoryMsg(option) {
      let historyMsg = [];
      let historyMsgInPay = [];
      let startTime =
        option.range === "week" ? getTimeStamp("week") : getTimeStamp("month");
      let channel = channelsList[option.shop];
      let rate = 0;
      let lostvolumeRate = 0;
      await slack
        .get(
          `/conversations.history?channel=${channel}&pretty=1&oldest=${startTime}`
        )
        .then(res => {
          res.data.messages.forEach(item => {
            item.subtype === "bot_message" ? historyMsg.push(item) : null;
            item.subtype === "bot_message";
            item.reactions ? historyMsgInPay.push(item) : null;
          });
        })
        .catch(err=>{
          console.log(err)
          isLoading.value = false;
        });
      if (option.isfirst) {
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
        dumpBill.value.drawChart(rate);
        dumpBillVolum.value.drawChart(lostvolumeRate);
        getPopularProduct(historyMsgInPay);
      }
      salesVolume.value.drawChart([historyMsg, historyMsgInPay]);
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

    onMounted(async () => {
      await getChannelsList();
      await getHistoryMsg({
        shop: "616-土瓜灣店",
        range: "month",
        isfirst: true
      });
    });
    return {
      isLoading,
      channelsList,
      salesVolume,
      dumpBill,
      dumpBillVolum,
      totalSalesMonth,
      totalSalesMonthInPay,
      getHistoryMsg,
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
.page-gird {
  display: grid;
  grid-template-columns: var(--grid-column-number);
  gap: 8px;
}
.page-header {
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 15px;
}
.page-header-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
.liquid-chart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>