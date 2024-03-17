<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import dishShow from '@/pubcomp/dish/dishShow/dishShow.vue'
import dishCommend from '@/pubcomp/dish/dishCommend/dishCommend.vue'
// 使用 open-type 和 onSuccess 事件传递参数
const dishId = ref()
const isStar = ref()
onLoad((query) => {
  // 通过 query 可以获取传递的参数
  dishId.value = query?.dishId
  isStar.value = query?.isStar
  console.log("父页面dishId: ", dishId.value, isStar.value);
});
</script>

<template>
  <dishShow :dishId="dishId" :isStar="isStar"></dishShow>
  <view class="dish-commend">
    <view class="tit">菜品评论</view>
    
    <dishCommend :dishId="dishId"></dishCommend>
  </view>
</template>

<style scoped>
.dish-commend{
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
}
.tit{
  color: #707070;
  font-size: 14px;
}
</style>