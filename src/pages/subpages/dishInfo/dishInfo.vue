<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import type { queryDishId } from '@/types/dishInfoT';
import dishShow from '@/pubcomp/dish/dishShow/dishShow.vue'
import dishCommend from '@/pubcomp/dish/dishCommend/dishCommend.vue'
import dishDetail from '@/pubcomp/dish/dishDetail/dishDetail.vue'
// 使用 open-type 和 onSuccess 事件传递参数
const DishId = ref<queryDishId>({
  dishId: ''
});

onLoad((query) => {
  // 通过 query 可以获取传递的参数
  DishId.value = query
  // 根据dishId发送get请求
});
</script>

<template>
  <dishShow></dishShow>
  <!-- 详情 -->
  <view class="dish-commend">
    <view class="tit">菜品详情</view>
    
    <dishDetail></dishDetail>
  </view>
  <!-- 美食的图片 以及信息 -->
  <view class="dish-commend">
    <view class="tit">菜品评论</view>
    
    <dishCommend></dishCommend>
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