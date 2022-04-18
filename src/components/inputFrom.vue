<template>
  <div class="container">
    <el-card>
      <h2>{{name}}</h2>
      <h3>{{subname}}</h3>
      <el-row :gutter="20" v-for="(item,index) of list" :key="index" class="pd5" :justify="jsutify">
        <el-col v-if="item.label" :xs="24" :sm="24" :md="4" :lg="2" :xl="2">
          <span class="title">{{item.label}}</span>
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
        <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="10">
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
            :class="{ slidercross: item.isCross}"
          />
          <!-- 輸入框 -->
          <el-input
            v-else-if="item.type === 'inputString'"
            v-model="item.value"
            :readonly="item.readonly"
            :placeholder="item.placeholder || '請輸入'"
          />
          <el-input-number
            v-else-if="item.type === 'inputNumber'"
            :placeholder="item.placeholder || '請輸入'"
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
              v-model="item.value[index]"
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
          <span :class="{ slidercross: item.isCross}">{{ timeFormat(item.value)}}</span>
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
      <el-row justify="start" class="pd5" v-if="showTimeStepOption">
        <el-button class="add" type="primary" @click="addBookingTimestep">新增時段+</el-button>
        <el-button class="add" type="danger" @click="deleteBookingTimestep">刪除時段</el-button>
      </el-row>
    </div>
    <el-row justify="center" class="pd5" v-if="showButton">
      <el-button class="submit" type="primary" @click="submitData" size="large">提交</el-button>
    </el-row>
  </div>
</template>
<script>
import { reactive, computed, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import useSetting from "../mixin/useSetting";
import { ElNotification } from "element-plus";
export default {
  name: "inputFrom",
  props: {
    id: String,
    name: String,
    shopid: String,
    subname: String,
    inputDate: Array,
    showButton: {
      type: Boolean,
      default: true
    },
    showTimeStepOption: {
      type: Boolean,
      default: false
    },
    jsutify: {
      type: String,
      default: "start"
    }
  },
  setup(props) {
    const router = useRouter();
    const { appContext } = getCurrentInstance();
    const util = appContext.config.globalProperties.util;
    const { timeFormat } = useSetting();
    let list = reactive([]);

    let childrenList = computed(() => {
      return list.filter(item => item.children && item.type === "group");
    });

    let sliderValueList = computed(() => {
      return childrenList.value.map(item => item.children[0]);
    });

    function crossVerify() {
      let isCross = false;
      let len = sliderValueList.value && sliderValueList.value.length;
      if (!len || len <= 1) return isCross;
      for (let i = 1; i < len; i++) {
        if (
          sliderValueList.value[i].value[0] <
            sliderValueList.value[i - 1].value[1] ||
          sliderValueList.value[i].value[1] <
            sliderValueList.value[i - 1].value[1]
        ) {
          sliderValueList.value[i].isCross = true;
          isCross = true;
        } else {
          sliderValueList.value[i].isCross = false;
        }
      }
      return isCross;
    }

    props.inputDate.map(item => {
      list.push(item);
    });

    // 提交數據localStorage
    function submitData() {
      if (crossVerify()) {
        ElNotification({
          title: "時段設置出現衝突",
          message: "時段設置不能重疊,請修改",
          type: "error"
        });
        return;
      }
      let data = {};
      let localData = JSON.parse(localStorage.getItem(props.id));
      if (props.shopid) {
        reWriteLastEditTime();
        data[props.shopid] = list;
        data = { ...localData, ...data };
      } else {
        data = list;
      }
      localStorage.setItem(props.id, JSON.stringify(data));
      ElNotification({
        title: "提交成功",
        message: "數據已經成功保存",
        type: "success"
      });
      router.go(-1);
    }
    // 記錄最後修改時間
    function reWriteLastEditTime() {
      if (list[0].key === "lastEditTime") {
        list[0].value = new Date();
      }
    }
    //複製并新增一份時段
    function addBookingTimestep() {
      props.inputDate.forEach(item => {
        if (item.children && item.name === "訂座時段") {
          let copyitem = util.deepClone(item);
          list.push(copyitem);
        }
      });
    }
    function deleteBookingTimestep(){
      let len = childrenList.value && childrenList.value.length;
      if (!len || len <= 1) return;
      list.pop();
    }
    // 修改截止訂座時間
    function timeselectChangeHandler(val) {
      let value = val.split(":");
      let hour = parseInt(value[0], 10);
      let minute = value[1] === "30" ? 0.5 : 0;
      sliderValueList.value.forEach(item => {
        item.min = hour + minute;
      });
    }

    return {
      list,
      childrenList,
      submitData,
      timeselectChangeHandler,
      timeFormat,
      addBookingTimestep,
      deleteBookingTimestep
    };
  }
};
</script>
<style scoped>
h2 {
  position: relative;
  margin-left: 10px;
  margin-bottom: 10px;
}
h2::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 100%;
  left: -10px;
  background-color: var(--el-color-primary-light-2);
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

.slidercross {
  --el-slider-main-bg-color: var(--el-color-danger);
  color: var(--el-color-danger);
}
</style>