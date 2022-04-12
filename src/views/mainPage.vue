<template>
  <div>
    <el-container style='height:100vh;overflow:hidden'>
      <el-header class="header flex">
        <div class="icon"></div>
        <div class="flex">
          <div>login</div>
          <div class="user"></div>
          <p>admin</p>
        </div>
      </el-header>
      <el-container class="body">
        <el-aside width="10" class="aside">
          <el-menu
            :default-active="menuIndex"
            mode="vertical"
            :collapse="true"
            :unique-opened="true"
            router
            background-color="#f3f6fd"
          >
            <subMenu v-for="(item,index) in menuList" :key="index" :detail="item" class="menu"></subMenu>
          </el-menu>

          <!-- <el-switch v-model="iscollapse" /> -->
        </el-aside>

        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import subMenu from "../components/subMenu";
export default {
  name: "mainPage",
  components: { subMenu },
  data() {
    return {
      menuIndex: "/",
      iscollapse: false,
      menuList: [
        {
          name: "首頁",
          icon: "HomeFilled",
          router: "/"
        },
        {
          name: "數據",
          icon: "Histogram",
          router: "dataPage",
          children: [
            {
              name: "外賣數據",
              router: "takeawayDataPage"
            },
            {
              name: "訂座數據",
              router: "bookingDataPage"
            }
          ]
        },
        {
          name: "配置",
          icon: "Setting",
          router: "settingPage",
          children: [
            {
              name: "預警配置",
              router: "settingPage"
            },
            {
              name: "訂座配置",
              router: "bookingsetting"
            }
          ]
        }
      ]
    };
  },
  methods: {
    getMenuIndex() {
      this.menuIndex = sessionStorage.getItem("menuIndex");
    }
  },
  mounted() {
    this.getMenuIndex();
  }
};
</script>
<style scoped>
.main {
  height: calc(100vh - 80px);
  overflow-y: scroll;
  background-color: var(--background-color-light);
}
.aside {
  background-color: var(--background-color-light);
  height: 100vh;
}
.menu {
  margin-bottom: 16px;
}
.body {
  flex: 1;
}
.header {
  background-color: var(--background-color-light);
  height: 80px;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.icon {
  width: 120px;
  height: 50px;
  background-size: contain;
  background-image: url("../assets/logo.png");
  background-repeat: no-repeat;
}
.user {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: bisque;
  margin-left: 10px;
  position: relative;
}
.user::before {
  position: absolute;
  left: -10px;
  content: "";
  width: 1px;
  height: 100%;
  background-color: #cccccc;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>