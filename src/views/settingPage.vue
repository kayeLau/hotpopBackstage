<template>
  <div>
    <el-card>
    <h2 class="pd10">異常數據預警</h2>
      <el-row
        :gutter="20"
        v-for="(item,index) of inputTitle"
        :key="index"
        class="pd10"
      >
        <el-col :span="Math.floor(item.span * 0.3)">
          <span class="title">{{item.key}}</span>

          <el-tooltip
            v-if="item.description"
            class="box-item"
            effect="dark"
            :content="item.description"
            placement="top-start"
          >
            <span class="description"></span>
          </el-tooltip>
        </el-col>
        <!-- 輸入框 -->
        <el-col :span="Math.ceil(item.span * 0.7)">
          <el-slider
            v-if="item.type === 'slider'"
            v-model="item.value"
            :max="item.max"
            :min="item.min"
          />
          <el-input v-else-if="item.type === 'input'" v-model="item.value" />
          <el-select
            v-else-if="item.type === 'select'"
            v-model="item.value"
            multiple
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { ref} from "vue";
export default {
  setup() {
    let inputTitle = ref([
      {
        type: "slider",
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
        options:[
            {
                value:'SMS',
                label:'SMS'
            },
            {
                value:'email',
                label:'email'
            },
            {
                value:'remaid',
                label:'站內提醒'
            }
        ]
      },
    ]);


    return {
      inputTitle
    };
  }
};
</script>
<style scoped>
.pd10{
    padding-bottom: 10px;
}
.input {
  display: inline;
}
.title {
  font-weight: bold;
}
.description {
  position: relative;
  margin-left: 3px;
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid var(--el-color-primary-light-2);
  border-radius: 50%;
}
.description::after {
  content: "?";
  position: absolute;
  color: var(--el-color-primary-light-2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
}
</style>