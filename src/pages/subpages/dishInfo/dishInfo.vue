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

  <navigator class="float-button" :url="`/pages/subpages/createComment/createComment?dishId=${dishId}&&mode=${1}`">评价</navigator>
</template>

<style scoped>
.float-button {
  position: fixed; /* 固定位置 */
  bottom: 30px; /* 距离底部50px */
  right: 15px; /* 距离右侧30px */
  width: 55px; /* 宽度 */
  height: 55px; /* 高度 */
  background-color: #ffb6c1; /* 背景颜色 */
  color: white; /* 字体颜色 */
  text-align: center; /* 文字居中 */
  line-height: 50px; /* 行高与容器高度相同 */
  border-radius: 50%; /* 圆角 */
  z-index: 999; /* 确保按钮在最上层 */
  box-shadow: 1px 2px 5px 2px rgba(89, 89, 89, 0.3);
}
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