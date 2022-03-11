<template>
  <div>
    <el-container style="height:100vh">
      <el-header></el-header>

      <el-container class="body">
        <el-aside width='200px' class="aside">
          <el-menu default-active="/" mode='vertical' :collapse="iscollapse" class="aside" router>
            <el-menu-item v-for="(item,index) in menuList" :key="index" :index="item.router">
              <template #title>
                <el-icon>
                   <Icon :icon="item.icon" :size="20"></Icon>
                </el-icon>
                  <span>{{item.name}}</span>
              </template>
            </el-menu-item>
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
export default {
  name: "mainPage",
  data() {
    return {
      iscollapse: false,
      menuList: [
        {
          name:"首頁",
          icon:"House",
          router:"/"
        },
        {
          name:"數據",
          icon:"PieChart",
          router:"dataPage"
        }, 
        {
          name:"配置",
          icon:"Setting",
          router:"settingPage"
        }
        ]
    };
  },
  methods: {}
};
</script>
<style scoped>
.main {
  background-image: url('../assets/616bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
}

.body {
  flex: 1;
}
.el-header {
  background-color: var(--el-color-primary);
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>