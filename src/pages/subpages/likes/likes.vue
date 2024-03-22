<script lang="ts" setup>
import type { dishItem, recoPar } from '@/types/dishInfoT';
import { ref, onMounted } from 'vue';
import { userStarDish } from '@/services/dish';
import { useuserStore } from '@/stores/user';
import { myStarDishService } from '@/services/mine';

const userStore = useuserStore();

const numberList = ["一", "二", "三", "四", "五"]
const spicyList = ["不辣", "微辣", "中辣", "爆辣"]
const salinityList = ["清淡", "一般", "偏咸"]
const dishList = ref<dishItem[]>([])

const starClick = async (dishId: string, key: number) => {
  // 修改当前列表isStar的值
  const stars = dishList.value[key].isStar ? false : true;
  dishList.value[key].isStar = stars;
  // 发送请求，添加/取消收藏
  await userStarDish(userStore.userInfo.openid, dishId, stars);
}
const recoParam = <recoPar>{
  page: 1,
  pageSize: 10,
  openid: userStore.userInfo.openid
}
let finshList = ref(false);
const myStarDishes = async ()=>{
  if (finshList.value) {
    return
  }
  let result = await myStarDishService(recoParam)
  // 都改成true
  for (let i = 0; i< result.data.items.length; i++){
    result.data.items[i].isStar = true;
  }
  dishList.value.push(...result.data.items)
  if (recoParam.page < result.data.pageCount) {
    recoParam.page += 1
  } else {
    finshList.value = true
  }
}

onMounted(()=>{
  myStarDishes();
})

</script>

<template>
  <navigator class="scroll-view-item" v-for="(item, key) in dishList" :key="item.dishId"
      :url="`/pages/subpages/dishInfo/dishInfo?dishId=${item.dishId}&&isStar=${item.isStar}`">
      <!-- 菜品图片区域 -->
      <image class="recommend-img" :src="item.image" mode="aspectFill" />
      <!-- 文字区域 -->
      <view class="recommend-itemtext">
        <!-- 菜品名称 -->
        <text class="dish-name">{{ item.dishName }}</text>
        <!-- 食堂 价格 -->
        <view class="dish-info">{{ numberList[item.canteen - 1] }}食堂&emsp;评分: {{ item.score }}</view>
        <!-- 口味 -->
        <view class="dish-info">咸淡:{{ salinityList[item.salinity - 1] }}&emsp;辣度:{{ spicyList[item.spicy - 1] }}</view>
        <!-- 评分 -->
        <span class="price">￥{{ item.price }}</span>
        <!-- 收藏 -->
        <view @tap.stop.prevent>
          <span class="sc" @click="starClick(item.dishId, key)">收藏
            <image v-if="item.isStar" class="icons" src="@/static/icons/star-fill.png" />
            <image v-else class="icons" src="@/static/icons/star.png" />
          </span>
        </view>

      </view>
    </navigator>
    <view class="page-bottom">{{ finshList ? "没有更多啦~" : "正在加载~" }}</view>
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


.price {
  position: absolute;
  color: #ee3f4d;
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

.page-bottom {
  display: flex;
  justify-content: center;
  color: #707070;
  margin: 10px;
}
</style>