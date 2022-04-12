<template>
  <div>
      <inputFrom id="unnormaInput" name="異常數據預警" :inputDate="unnormalnput"></inputFrom>
  </div>
</template>
<script>
import inputFrom from "../components/inputFrom";
// import { reactive } from "vue";
export default {
  components: {
    inputFrom
  },
  setup() {
    let unnormalnput = [
      {
        type: "inputNumber",
        key: "甩單率",
        value: 0,
        placeholder: "",
        span: 10,
        description: "將在高於此值時發送消息提醒,取值由0-100%",
        max: 100,
        min: 0
      },
      {
        type: "select",
        key: "預警方式",
        value: "",
        placeholder: "請選擇",
        span: 10,
        multiple:true,
        options: [
          {
            value: "SMS",
            label: "SMS"
          },
          {
            value: "email",
            label: "email"
          },
          {
            value: "remaid",
            label: "站內提醒"
          }
        ]
      }
    ];
    return {
      unnormalnput
    };
  }
};
</script>