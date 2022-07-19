<template>
    <div>
        <inputFrom id="edit" name="編輯" :inputDate="editDate"></inputFrom>
    </div>
</template>
<script>
import inputFrom from "../../components/inputFrom";
import { useRoute } from "vue-router";
export default {
  components: {
    inputFrom
  },
  setup() {
    const route = useRoute();
    const data = route.params;
    console.log(data);
    let editDate = [
      {
        type: "inputString",
        label: "商品名稱",
        value: data.name,
        placeholder: "",
      },
      {
        type: "inputNumber",
        label: "價格",
        value: data.price,
        placeholder: "",
      },
      {
        type: "selectgroup",
        label: "商品集合",
        value: data.productCollection,
      },
    ];
    return {
      editDate
    };
  }
};
</script>