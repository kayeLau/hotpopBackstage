<template>
  <div>
    <inputFrom
      id="bookingInput"
      name="基本配置"
      :showTimeStepOption="true"
      :inputDate="bookingData"
      :shopid="shopid"
    ></inputFrom>
  </div>
</template>
<script>
import inputFrom from "../../components/inputFrom";
import { useRoute } from "vue-router";
import useSetting  from '../../mixin/useSetting'
export default {
  name: "bookingSetting",
  components: {
    inputFrom
  },
  setup() {
    const route = useRoute();
    const shopid = route.query.shopid;
    const id = "bookingInput";
    const { timeFormat } = useSetting();

    function getLocalData() {
      let list = [];
      let localData = JSON.parse(localStorage.getItem(id));
      if (!localData || !localData[shopid]) {
        return
      } else {
        list = localData[shopid];
        list[1].value = shopid;
        for(let i = 4;i < list.length;i++){
          list[i].children[0].format = timeFormat
        }
      }
      return list
    }
    let bookingData = getLocalData();
    return {
      bookingData,
      shopid
    };
  }
};
</script>