<template>
  <el-card class="box-card" :body-style="{ padding:'5px'}">
    <template #header>
      <div class="card-header">
        <h3 class="box-card-title">{{title}}</h3>
        <div class="card-picker">
          <!-- 下拉 -->
          <el-dropdown>
            <span class="el-dropdown-link">分店</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- 按鈕 -->
          <el-button-group>
            <el-button
              :type="index === listsort ? 'primary' : null"
              v-for="(item,index) in ['本日','本周']"
              :key="index"
              @click="listChange(index)"
            >{{item}}</el-button>
          </el-button-group>
        </div>
      </div>
    </template>
    <div :id="name" style="width:100%; height:240px;"></div>
  </el-card>
</template>
<script>
import { onMounted, getCurrentInstance, ref } from "vue";
export default {
  props: {
    name: String,
    title: String,
    chartIndex: Number
  },
  setup(props,context) {
    const internalInstance = getCurrentInstance();
    const util = internalInstance.appContext.config.globalProperties.util;
    let listsort = ref(1);
    let myChart = null;
    const BASIC_OPTION = {
      legend: {
        show: true,
        bottom: -5,
        left: "center",
        icon: "circle",
        itemWidth: 6,
        itemHeight: 6
      },
      color: ["#0098d9", "#eb8146", "#22c3aa", "#a0a7e6", "#fcce10"],
      grid: {
        left: "8%",
        right: "2%",
        bottom: "15%",
        top: "10%"
      },
      xAxis: {},
      yAxis: {
          type: "value",
          name: "",
          nameTextStyle: {
            fontWeight: 200,
            fontSize: 12
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#666666",
              width: 0
            }
          },
          splitLine: {
            lineStyle: {
              color: ["#E8E8E8"],
              type: "dotted"
            }
          },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#666666'
              },
              // 將金額傳為中文後綴,解決數字過長問題
              formatter: (v) => {
                return util.moneyFormatterInChineseSuffix(v);
              }
            }
        },
      label: {},
      tooltip: {
        trigger: "axis"
      }
    };

    // 初始化echart
    function init() {
      const echarts =
        internalInstance.appContext.config.globalProperties.echarts;
      myChart = echarts.init(document.getElementById(props.name));
    }
    // 繪圖
    function drawChart(chartData) {
      // if (chartData) {
      //   sessionStorage.setItem("chartData", JSON.stringify(chartData));
      //   data = chartData;
      // } else {
      //   data = JSON.parse(sessionStorage.getItem("chartData"));
      // }
      const fullOption = assembleDataToOption(
        getTransactions(chartData),
        gernerateXaxis()
      );
      myChart.setOption(fullOption);
    }
    function listChange(value) {
      if (listsort.value === value) return;
      if(listsort.value === 1){
        context.emit('updateChartView',{ shop: "616-土瓜灣店",range:'week'})
      }else{
        context.emit('updateChartView',{ shop: "616-土瓜灣店",range:'month'})
      }
      listsort.value = value;
      // drawChart();
    }
    // 生成日期列表
    function gernerDatelist() {
      if (listsort.value === 0) {
        return new Array(7).fill(0);
      } else {
        return new Array(31).fill(0);
      }
    }
    // 生成日期上標
    function getDateIndex(time) {
      if (listsort.value === 0) {
        return time.getDay();
      } else {
        return time.getDate() - 1;
      }
    }
    //
    function getTransactions(chartData) {
      let nameList = ['訂單量','成功交易量'];
      let list = [];
      chartData.forEach((item,index) => {
        const len = item.length;
        let moneyAmount = 0;
        const detail = {
          symbol: "circle",
          symbolSize: 5,
          type: "line",
          smooth:true
        };
        detail.data = gernerDatelist();
        detail.name = nameList[index];
        for (let i = 0; i < len; i++) {
          let ordertime = item[i].blocks[0].text.text.slice(4, 14);
          let nextOrderTime =
            i === len - 1 ? null : item[i + 1].blocks[0].text.text.slice(4, 14);
          if (ordertime === nextOrderTime) {
            moneyAmount += moneyAmountFromatter(item[i]);
          } else {
            const dateIndex = getDateIndex(new Date(ordertime));
            console.log(dateIndex)
            moneyAmount += moneyAmountFromatter(item[i]);
            detail.data[dateIndex] = moneyAmount;
            moneyAmount = 0;
          }
        }
        list.push(detail);
      });
      return list;
    }

    // function isThisWeek(day) {
    //   let today = new Date();
    //   today.setHours(0);
    //   let weedday = today.getDay() - 1;
    //   let time = today.getTime();
    //   let ans = day.getTime() - time - weedday * 24 * 3600 * 1000;
    //   return ans > 0 ? true : false;
    // }
    // 按需生成X軸
    function gernerateXaxis() {
      const weeklist = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      date.setDate(0); //獲取最後一天
      const numOfDate = new Date(date);
      if (listsort.value === 0) {
        return new Array(7).fill(0).map((item, index) => weeklist[index]);
      } else {
        return new Array(numOfDate.getDate())
          .fill(0)
          .map((item, index) => index + 1);
      }
    }
    // 組合數據與設置
    function assembleDataToOption(chartdata, date) {
      return Object.assign(BASIC_OPTION, {
        xAxis: {
          data: date
        },
        series: chartdata
      });
    }
    function moneyAmountFromatter(item) {
      return parseInt(
        item.attachments[item.attachments.length - 1].pretext.slice(4)
      );
    }
    onMounted(() => {
      init();
    });
    return {
      listChange,
      listsort,
      drawChart,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
