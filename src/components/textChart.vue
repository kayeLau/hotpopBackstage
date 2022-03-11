<template>
    <div class="box-card-liquid">
        <span>{{formatter}}</span>
        <div class="box-card-liquid-subtitle">{{title}}</div>
    </div>
</template>
<script>
import { computed,getCurrentInstance } from 'vue'
export default {
    props:{
        name:String,
        title:String,
        sales:Number
    },
    setup(props){
        const internalInstance = getCurrentInstance();
        const util = internalInstance.appContext.config.globalProperties.util;


        let formatter = computed(()=>{
            return util.moneyFormatter(props.sales,0)
        })
        return {
            formatter
        }
    }
}
</script>
<style scoped>
.box-card-liquid > span{
    font-size: 50px;
    font-weight: 400;
}
</style>