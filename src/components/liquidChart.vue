<template>
<div class="box-card-liquid">
  <div :id="name" style="width:150px;height:150px;"></div>
  <div class="box-card-liquid-subtitle">{{title}}</div>
</div>
</template>
<script>
import { getCurrentInstance,onMounted} from "vue";
export default {
  props:{
    name:String,
    title:String
  },
  setup(props) {
    let criclecolor = "#EF525B";
    let insedecolor = ["#EF525B"];
    let myChart = null;

    function init(){
      const internalInstance = getCurrentInstance();
      const echarts = internalInstance.appContext.config.globalProperties.echarts;
      myChart = echarts.init(document.getElementById(props.name));
    }

    function drawChart(rate) {
      console.log(rate)
      rate = rate || 0;
      const liquiddata = [rate];
      myChart.setOption({
        // 数据
        backgroundColor: "#ffffff",
        series: [
          {
            type: "liquidFill",
            data: liquiddata,
            center: ["50%", "50%"],
            radius: "80%",
            color: insedecolor,
            outline: {
              show: false
            },
            animationDuration: 0,
            animationDurationUpdate: 1000,
            hoverAnimation: false,
            silent: true,
            backgroundStyle: {
              color: "#FFFFFF",
              borderColor: criclecolor,
              borderWidth: 1
            },
            itemStyle: {
              opacity: 0.5, // 波浪的透明度
              shadowBlur: 0, // 波浪的阴影范围
              shadowColor: "#f60" // 阴影颜色
            },
            // outline: {
            //   show: false,
            // },
            label: {
              // 此处为指示线文字
              show: true,
              color: "#000",
              insideColor: "#000",
              position: ["50%", "40%"],
              textStyle: {
                fontSize: 20,
                fontWeight: "normal"
              }
            }
          }
        ]
      });
    }
    onMounted(()=>{
      init();
    });
    return{
      drawChart
    }
  }
};
</script>
<style scoped>

</style>