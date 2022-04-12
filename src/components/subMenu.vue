<template>
  <el-menu-item v-if="!item.children" :index="item.router" @click="saveMenuIndex(item.router)">
    <el-icon :size="50">
      <Icon :icon="item.icon"></Icon>
    </el-icon>
  </el-menu-item>

  <el-sub-menu v-else :index="item.router">
    <template #title>
      <el-icon :size="50">
        <Icon :icon="item.icon"></Icon>
      </el-icon>
    </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="(child,index) of item.children || []"
          :key="index"
          :index="child.router"
          @click="saveMenuIndex(child.router)"
        >{{child.name}}</el-menu-item>
      </el-menu-item-group>
  </el-sub-menu>
</template>
<script>
import { toRef } from "vue";
export default {
  name:'subMenu',
  props: {
    detail: Object
  },
  setup(props) {
    const item = toRef(props, "detail");

    function saveMenuIndex(index) {
      sessionStorage.setItem("menuIndex", index);
    }

    return {
      saveMenuIndex,
      item
    };
  }
};
</script>
    