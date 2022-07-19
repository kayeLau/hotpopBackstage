<template>
  <div>
    <div class="toolbar">
      <el-dropdown @command="tagChangeHandleCommand">
      <el-button type="primary">
            <span class="dropdown-link" >{{tagName === 'shop' ? '門店' : tagName === 'collection' ? '集合' : '商品'}}</span>
      </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="shop">門店</el-dropdown-item>
            <el-dropdown-item command="collection">集合</el-dropdown-item>
            <el-dropdown-item command="product">商品</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header></template>
      <el-table :data="testData[tagName]" border stripe>
        <el-table-column v-if="tagName === 'product'" prop="image" label="圖片" width="180" />
        <el-table-column prop="name" label="名稱" width="180" />
        <el-table-column v-if="tagName === 'product'" prop="price" label="價錢" width="180" />
        <el-table-column v-if="tagName === 'product'" prop="pCollection" label="商品屬於" width="180" />
        <el-table-column v-if="tagName === 'product'" prop="Specifications" label="規格" width="180" />
        <el-table-column v-if="tagName === 'shop'" prop="sCollection" label="商店擁有集合" width="180" />
        <el-table-column v-if="tagName === 'collection'" prop="cCollection" label="集合下的菜品" width="180" />
        <el-table-column label="Operations" fixed="right" >
        <template #default="scope">
          <el-button class="mg5-right" size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import {reactive, ref } from "vue";
export default {
  setup() {
    const $router = useRouter();
    let tagName = ref("product");
    let testData = reactive({
      shop: [
        {
          name: "土瓜灣店",
          sCollection: ['獨門秘牛','牛總推介']
        }
      ],
      collection: [
        {
          name: "獨門秘牛",
          cCollection:[
            '手打牛滑',"清湯牛筋腩","牛肉餃"
          ]
        },
        {
          name: "牛總推介",
          cCollection:[
            '安格斯 橫隔肌',"滑尾龍","花雕醉牛"
          ]
        }
      ],
      product: [
        {
          name: "手打牛滑",
          image: "",
          price: 48,
          pCollection: ['獨門秘牛'],
          Specifications: []
        },
        {
          name: "清湯牛筋腩",
          image: "",
          price: 48,
          pCollection: ['獨門秘牛'],
          Specifications: []
        },
        {
          name: "牛肉餃",
          image: "",
          price: 48,
          pCollection: ['獨門秘牛'],
          Specifications: []
        },
        {
          name: "安格斯 橫隔肌",
          image: "",
          price: 48,
          pCollection: ['牛總推介'],
          Specifications: []
        },
        {
          name: "滑尾龍",
          image: "",
          price: 48,
          pCollection: ['牛總推介'],
          Specifications: []
        },
        {
          name: "花雕醉牛",
          image: "",
          price: 48,
          pCollection: ['牛總推介'],
          Specifications: []
        }
      ]
    });

    function tagChangeHandleCommand(command){
        console.log(command)
        tagName.value = command
    }
    function handleEdit(index,row){
      console.log(row)
      $router.push({
        name: 'editProductDetail',
        params: row,
      });
    }

    return {
      tagName,
      testData,
      tagChangeHandleCommand,
      handleEdit
    };
  }
};
</script>
<style>
.dropdown-link{
    font-size: 15px;
}
.toolbar {
  padding: 15px 0;
}
</style>