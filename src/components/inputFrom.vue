<template>
  <div class="container">
    <el-card>
      <h2>{{name}}</h2>
      <h3>{{subname}}</h3>
      <el-row
        :gutter="20"
        v-for="(item,index) of list"
        :key="index"
        class="pd10"
        :justify="jsutify"
      >
        <el-col v-if="item.key" :xs="24" :sm="24" :md="4" :lg="2" :xl="2">
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
        <el-col :span="item.span">
          <!-- 滑動框 -->
          <el-slider
            v-if="item.type === 'slider'"
            v-model="item.value"
            :max="item.max"
            :min="item.min"
            :range="item.range"
            :step="item.step"
            :show-stops="item.showStops"
            :format-tooltip="item.format"
          />
          <!-- 輸入框 -->
          <el-input v-else-if="item.type === 'inputString'" v-model="item.value" />
          <el-input-number
            v-else-if="item.type === 'inputNumber'"
            v-model="item.value"
            :max="item.max"
            :min="item.min"
          />
          <!-- 時間框 -->
          <el-time-picker
            v-else-if="item.type === 'timepicker'"
            :placeholder="item.placeholder || '請選擇'"
            v-model="item.value"
            format="HH:mm"
          ></el-time-picker>
          <!-- 時間下拉框 -->
          <el-time-select
            v-else-if="item.type === 'timeselect'"
            v-model="item.value"
            :placeholder="item.placeholder || '請選擇'"
            :start="item.start"
            :step="item.step"
            :end="item.end"
            @change="timeselectChangeHandler"
          />
          <!-- 組合下拉框 -->
          <div v-else-if="item.type === 'selectgroup'">
            <el-select
              v-for="(itemchildren,index) of item.group"
              :key="index"
              v-model="itemchildren.value"
              :placeholder="item.placeholder"
            >
              <el-option
                v-for="option in itemchildren.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>
          <!-- 下拉框 -->
          <el-select
            v-else-if="item.type === 'select'"
            v-model="item.value"
            :multiple="item.multiple"
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
        <el-col v-if="item.showvalue" :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <span>{{ timeFormat(item.value)}}</span>
        </el-col>
      </el-row>
    </el-card>
    <div v-if="childrenList">
      <inputFrom
        v-for="(item,index) of childrenList"
        :key="index"
        :name="'時段' + (index + 1)"
        :inputDate="item.children"
        :showButton="false"
      ></inputFrom>
      <el-row justify="start" class="pd10" v-if="showButton">
        <el-button class="add" type="primary" @click="addBookingTimestep">新增時段+</el-button>
        <el-button class="add" type="danger" @click="addBookingTimestep">刪除時段</el-button>
      </el-row>
    </div>
    <el-row justify="center" class="pd10" v-if="showButton">
      <el-button class="submit" type="primary" @click="submitData" size="large">提交</el-button>
    </el-row>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
export default {
  name: "inputFrom",
  props: {
    id: String,
    name: String,
    subname: String,
    inputDate: Array,
    showButton: {
      type: Boolean,
      default: true
    },
    jsutify: {
      type: String,
      default: "start"
    }
  },
  setup(props) {
    let list = reactive([]);

    let childrenList = computed(() => {
      return list.filter(item => item.children && item.type === 'group');
    });

    // console.log(childrenList);
    function setData() {
      let localData = JSON.parse(localStorage.getItem(props.id));
      if (!localData) {
        props.inputDate.map(item => {
          list.push(item);
        });
      } else {
        localData.forEach(item => {
          list.push(item);
        });
      }
    }
    setData();

    function submitData() {
      localStorage.setItem(props.id, JSON.stringify(list));
    }

    function addBookingTimestep(){
      props.inputDate.forEach(item => {
        if(item.children){
          let copyitem = JSON.parse(JSON.stringify(item));
          list.push(copyitem);
        }
        });
    }

    function timeselectChangeHandler(val) {
      let value = val.split(":");
      let hour = parseInt(value[0], 10);
      let minute = value[1] === "30" ? 0.5 : 0;
      list
        .filter(item => item.children)[0]
        .children.forEach(item => {
          item.min = hour + minute;
        });
    }

    function timeFormat(val) {
      let res = "";
      if (Array.isArray(val)) {
        val.forEach(item => {
          let minute = String(item).split(".")[1] === "5" ? "30" : "00";
          res += String(item).split(".")[0] + ":" + minute;
          res += " - ";
        });
        res = res.substring(0, res.length - 3);
      } else {
        res = val;
      }
      return res;
    }
    return {
      list,
      childrenList,
      submitData,
      timeselectChangeHandler,
      timeFormat,
      addBookingTimestep
    };
  }
};
</script>
<style scoped>
h2 {
  position: relative;
  margin-left: 10px;
  margin-bottom: 20px;
}
h2::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 100%;
  left: -10px;
  background-color: var(--el-color-primary-light-2);
}
.pd10 {
  padding-bottom: 10px;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
.submit {
}
</style>