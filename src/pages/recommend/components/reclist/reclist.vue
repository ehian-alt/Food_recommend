<script lang="ts" setup>
import { ref } from 'vue';
import { recommendService } from '@/services/dish'
import type { recoPar, dishItem } from '@/types/dishInfoT';
import { onMounted } from 'vue';

const props = defineProps();
let ms = {
  canteen: 0,
  spicy: 0,
  salinity: 0
}
const numberList = ["一", "二", "三", "四", "五"]
const spicyList = ["不辣", "微辣", "中辣", "爆辣"]
const salinityList = ["清淡", "一般", "偏咸"]
const dishList = ref<dishItem[]>([])
const recoParam = <recoPar>{
  page: 1,
  pageSize: 10,
}
let finshList = ref(false);
const getRecoItems = async () => {
  if (finshList.value){
    return
  }
  let result = await recommendService(recoParam)
  dishList.value.push(...result.data.items)
  if (recoParam.page < result.data.pageCount){
    recoParam.page += 1
  }else{
    finshList.value = true
  }
}

uni.$on('saveTaste', (data) => {
  ms = data.filterData
  recoParam.canteen = ms.canteen
  recoParam.spicy = ms.spicy
  recoParam.salinity = ms.salinity
  console.log("口味偏好参数", recoParam);

  recoParam.page = 1;
  finshList.value = false
  dishList.value = []
  getRecoItems()
})

onMounted(() => {
  getRecoItems()
})
defineExpose({
  getRecoItems
})
</script>

<template>
  <view>
    <!-- <div class="reclist">msg:{{ ms }}</div> -->
    <navigator class="scroll-view-item" v-for="item in dishList" :key="item.dishId"
      :url="`/pages/subpages/dishInfo/dishInfo?dishId=${item.dishId}`">
      <!-- 菜品图片区域 -->
      <image class="recommend-img" :src="item.image" mode="aspectFill" />
      <!-- 文字区域 -->
      <view class="recommend-itemtext">
        <!-- 菜品名称 -->
        <text class="dish-name">{{ item.dishName }}</text>
        <!-- 食堂 价格 -->
        <view class="dish-info">{{ numberList[item.canteen - 1] }}食堂&emsp;￥{{ item.price }}</view>
        <!-- 口味 -->
        <view class="dish-info">咸淡:{{ salinityList[item.salinity - 1] }}&emsp;辣度:{{ spicyList[item.spicy] }}</view>
        <!-- 评分 -->
        <span class="pf">评分：{{ item.score }}</span>
        <!-- 收藏 -->
        <span class="sc">收藏
          <image v-if="true" class="icons" src="@/static/icons/star.png" />
          <image v-else class="icons" src="@/static/icons/star-fill.png" />
        </span>
      </view>
    </navigator>
    
    <view class="page-bottom">{{finshList ? "没有更多啦~" : "正在加载~"}}</view>
  </view>
</template>

<style scoped>
.recommend-itemtext {
  flex: 60%;
  padding: 5px 8px 5px 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border: #000 1px solid; */
  position: relative;
}

.recommend-img {
  border-radius: 20px;
  overflow: hidden;
  height: 110px;
  width: 110px;
}

.dish-name {
  font-family: "宋体", "SimSun", sans-serif;
  font-weight: bold;
  font-size: 23px;
}

.dish-info {
  margin: 5px 0;
  font-size: 15px;
  color: #808080;
}


.pf {
  position: absolute;
  left: 20px;
  bottom: 5px;
}

.sc {
  position: absolute;
  right: 8px;
  bottom: 5px;
}


.scroll-view-item {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  padding: 8px;
  background-color: #fff;
  margin: 10px;
}

.icons {
  height: 1.2rem;
  width: 1.2rem;
  transform: translateY(20%);
}

.page-bottom{
  display: flex;
  justify-content: center;
  color:#707070;
  margin: 10px;
}
</style>