<template>
  <div>
    <inputFrom
      id="bookingInput"
      name="基本配置"
      :showTimeStepOption="true"
      :inputDate="bookingInput"
      :shopid="shopid"
    ></inputFrom>
  </div>
</template>
<script>
import inputFrom from "../../components/inputFrom";
import { useRoute } from "vue-router";
export default {
  name: "bookingSetting",
  components: {
    inputFrom
  },
  setup() {
    const route = useRoute();
    const shopid = route.query.shopid;

    function timeFormatTooltip(val) {
      let minute = String(val).split(".")[1] === "5" ? "30" : "00";
      return String(val).split(".")[0] + ":" + minute;
    }
    
    let bookingInput = [
      {
        type: "hidden",
        key: "最後修改時間",
        value: '',
      },
      {
        type: "inputString",
        key: "分店編號",
        value: shopid,
        placeholder: "",
        span: 6,
        readonly: true
      },
      {
        type: "inputString",
        key: "分店名稱",
        value: "",
        placeholder: "請輸入分店名稱",
        span: 6
      },
      {
        type: "timeselect",
        key: "截止訂座時間",
        value: "",
        placeholder: "",
        span: 6,
        start: "15:00",
        end: "24:00",
        step: "00:30"
      },
      {
        type: "group",
        name: "訂座時段",
        children: [
          {
            type: "slider",
            key: "",
            value: [12, 24],
            placeholder: "",
            range: true,
            showStops: true,
            span: 20,
            max: 24,
            min: 12,
            step: 0.5,
            format: timeFormatTooltip,
            showmark: true,
            showvalue: true
          },
          {
            type: "selectgroup",
            key: "用餐時間",
            placeholder: "請選擇",
            span: 12,
            group: [
              {
                value: "",
                options: [
                  {
                    value: "1hr",
                    label: "1hr"
                  },
                  {
                    value: "2hr",
                    label: "2hr"
                  },
                  {
                    value: "3hr",
                    label: "3hr"
                  },
                  {
                    value: "4hr",
                    label: "4hr"
                  }
                ]
              },
              {
                value: "",
                options: [
                  {
                    value: "0min",
                    label: "0min"
                  },
                  {
                    value: "15min",
                    label: "15min"
                  },
                  {
                    value: "30min",
                    label: "30min"
                  },
                  {
                    value: "45min",
                    label: "45min"
                  }
                ]
              }
            ]
          },
          {
            type: "inputNumber",
            key: "位",
            value: 0,
            placeholder: "",
            span: 10,
            description: "",
            max: 100,
            min: 0
          },
          {
            type: "select",
            key: "間距",
            value: "",
            placeholder: "請選擇",
            span: 10,
            options: [
              {
                value: "15min",
                label: "15min"
              },
              {
                value: "30min",
                label: "30min"
              },
              {
                value: "45min",
                label: "45min"
              }
            ]
          }
        ]
      }
    ];

    return {
      bookingInput,
      shopid
    };
  }
};
</script>