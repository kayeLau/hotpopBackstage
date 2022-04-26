import { createApp,createVNode } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import router from './router'
import * as echarts from "echarts"
import 'echarts-liquidfill'
import './index.css'
import { Util } from './util/custom'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.echarts = echarts;
app.config.globalProperties.util = Util;
app.config.globalProperties.$echartsResize = function(ref){
    window.addEventListener('resize',function () {
      ref.resize()
    })
}

const Icon = (props) => {
    const { icon } = props
    return createVNode(Icons[icon])
}

app.component('Icon', Icon)
app.mount('#app')