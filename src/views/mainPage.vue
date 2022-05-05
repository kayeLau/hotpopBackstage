<template>
  <div>
    <el-container style="height:100vh;overflow:hidden">
      <el-header class="header flex">
        <div class="flex">
          <div :class="{dir:true,dirclick:isdirclick}" v-if="!showmenu" @click="dirClickHandle">
            <span></span>
          </div>
          <div class="icon" v-if="showmenu"></div>
        </div>
        <div class="flex">
          <div class="user"></div>
          <p>admin</p>
        </div>
      </el-header>
      <el-container class="body">
        <el-aside width="10" class="aside">
          <el-menu
            v-if="showmenu"
            :default-active="menuIndex"
            mode="vertical"
            :collapse="true"
            :unique-opened="true"
            router
            background-color="#f3f6fd"
          >
            <subMenu v-for="(item,index) in menuList" :key="index" :detail="item" class="menu"></subMenu>
          </el-menu>

          <el-drawer v-else v-model="isdirclick" direction="ltr" size="40%" :open-delay="400">
          <template #title>
            <div style="display: flex;justify-content: flex-start;">
              <div class="icon"></div>
            </div>
          </template>
            <el-menu
              :default-active="menuIndex"
              mode="vertical"
              :collapse="false"
              :unique-opened="true"
              router
              background-color="#f3f6fd"
            >
              <subMenu v-for="(item,index) in menuList" :key="index" :detail="item" class="menu"></subMenu>
            </el-menu>
          </el-drawer>
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
      screenSize: null,
      showmenu: true,
      isdirclick: false,
      menuList: [
        {
          name: "主頁",
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
              router: "/takeawayDataPage"
            }
          ]
        },
        {
          name: "配置",
          icon: "Setting",
          router: "settingPage",
          children: [
            {
              name: "訂座配置",
              router: "/setting/shopBookingList"
            }
          ]
        }
      ]
    };
  },
  methods: {
    getMenuIndex() {
      this.menuIndex = sessionStorage.getItem("menuIndex") || this.menuIndex;
    },
    getscreenSize() {
      if (window.matchMedia("(max-width: 800px)").matches) {
        this.screenSize = "small";
        this.showmenu = false;
      } else {
        this.screenSize = "big";
        this.showmenu = true;
      }
    },
    dirClickHandle() {
      this.isdirclick = !this.isdirclick;
    }
  },
  mounted() {
    this.getscreenSize();
    window.addEventListener("resize", this.getscreenSize);
    this.getMenuIndex();
  }
};
</script>
<style scoped>
.main {
  height: calc(100vh - 60px);
  overflow-y: scroll;
  overflow-x: hidden;
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
  height: 60px;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}
.icon {
  width: 120px;
  height: 40px;
  background-size: contain;
  background-image: url("../assets/logo.png");
  background-repeat: no-repeat;
}
/* dir */
.dir {
  position: relative;
  display: inline-block;
  width: 22px;
  height: 20px;
  margin-right: 20px;
  margin-bottom: 3px;
}
.dir span {
  margin: 0 auto;
  position: relative;
  top: 8px;
}
.dir span:before,
.dir span:after {
  position: absolute;
  content: "";
}
.dir span,
.dir span:before,
.dir span:after {
  width: 22px;
  height: 3px;
  background-color: #242424;
  display: block;
}
.dir span:before {
  margin-top: -8px;
}
.dir span:after {
  margin-top: 8px;
}
/* example 5 */
.dir span {
  -webkit-transition-duration: 0s;
  transition-duration: 0s;
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
.dir span:before {
  -webkit-transition-property: margin, -webkit-transform;
  transition-property: margin, transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-delay: 0.2s, 0s;
  transition-delay: 0.2s, 0s;
}
.dir span:after {
  -webkit-transition-property: margin, -webkit-transform;
  transition-property: margin, transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-delay: 0.2s, 0s;
  transition-delay: 0.2s, 0s;
}
.dirclick span {
  background-color: rgba(0, 0, 0, 0);
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
.dirclick span:before {
  margin-top: 0;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition-delay: 0s, 0.2s;
  transition-delay: 0s, 0.2s;
}
.dirclick span:after {
  margin-top: 0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transition-delay: 0s, 0.2s;
  transition-delay: 0s, 0.2s;
}

/* user */
.user {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: bisque;
  margin-left: 10px;
  position: relative;
}
</style>