<script lang="ts" setup>
import { onMounted, toRefs, ref } from 'vue';
import { dishInfoPage } from '@/services/dish';
import type { dishItem } from "@/types/dishInfoT";
import { userStarDish } from '@/services/dish'
import { useuserStore } from '@/stores/user';

const userStore = useuserStore();

const numberList = ["一", "二", "三", "四", "五"]
const spicyList = ["不辣", "微辣", "中辣", "爆辣"]
const salinityList = ["清淡", "一般", "偏咸"]

interface dish {
  dishId: string,
  isStar: string
}
// 接收来自父组件的参数
const props = defineProps<dish>();
const { dishId, isStar } = toRefs(props);

const dishInfo = ref<dishItem>()
const info = ref({
  canteen: '',
  spicy: '',
  salinity: ''
})
const starClick = async () => {
  // 修改当前列表isStar的值
  dishInfo.value!.isStar = !dishInfo.value!.isStar;
  // 发送请求，添加/取消收藏
  await userStarDish(userStore.userInfo.openid, dishId.value, dishInfo.value!.isStar);
}

onMounted(async () => {

  console.log("子组件dishId: ", dishId.value, isStar.value);
  // 发送
  let result = await dishInfoPage(dishId.value);
  dishInfo.value = result.data;
  dishInfo.value.isStar = isStar.value == 'true' ? true : false;
  console.log(dishInfo.value);
  info.value.canteen = numberList[dishInfo.value.canteen - 1]
  info.value.spicy = spicyList[dishInfo.value.spicy - 1]
  info.value.salinity = salinityList[dishInfo.value.salinity - 1]
})
</script>

<template>
  <view>
    <!-- 美食图片 -->
    <image class="dish-bigpic" :src="dishInfo ? dishInfo?.image : 'https://img.yzcdn.cn/vant/cat.jpeg'"
      mode="aspectFill" />
    <!-- 美食信息 -->
    <view class="dish-info">
      <!-- 美食名称 -->
      <view class="bigname"><text class="dishName">{{ dishInfo?.dishName }}</text></view>
      <!-- 收藏 -->
      <view class="star" @click="starClick">
        <image v-if="dishInfo?.isStar" class="icons" src="@/static/icons/star-fill.png" />
        <image v-else class="icons" src="@/static/icons/star.png" />
        <br>
        收藏
      </view>
      <view class="canteen">{{ info.canteen }}食堂&ensp;{{ dishInfo?.shopId[0] }}楼{{ dishInfo?.shopId.substring(1, 3)
        }}号窗口
      </view>
      <!-- 价格 -->
      <view class="price"><span class="dolle-fu">￥</span>{{ dishInfo?.price }}</view>
      <!-- 食堂导航 -->
      <view class="location">
        <image class="icons ty-icon" src="@/static/icons/location-fill.png" />
        <span>导航</span>
      </view>
    </view>
  </view>

  <view class="dish-commend">
    <view class="tit">菜品详情</view>

    <view class="detail">
      <view>辣度: &ensp;{{ info.spicy }}</view>
      <view>咸淡: &ensp;{{ info.salinity }}</view>
      <view>平均评分: &ensp;{{ dishInfo?.score }}</view>
      <view>xx人已收藏</view>
    </view>
  </view>

</template>

<style scoped>
.dish-bigpic {
  width: 100%;
  height: 250px;
}

.dish-info {
  font-family: "Microsoft YaHei";
  position: relative;
  height: 150px;
  background: #fff;
}

.bigname {
  position: absolute;
  width: 80%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  left: 20px;
  top: 20px;
}

.dishName {
  /* font-family: "宋体", "SimSun", sans-serif; */
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 22px;
}

.star {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #808080;
  font-size: 12px;
}

.icons {
  height: 1.5rem;
  width: 1.5rem;
}

.canteen {
  color: #808080;
  position: absolute;
  left: 20px;
  top: 80px;
}

.price {
  position: absolute;
  left: 20px;
  bottom: 10px;
  font-size: 23px;
  color: #ee3f4d;
}

.dolle-fu {
  font-size: 16px;
}

.location {
  position: absolute;
  bottom: 20px;
  right: 25px;
}

.ty-icon {
  transform: translateY(20%);
}

.dish-commend {
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
}

.tit {
  color: #707070;
  font-size: 14px;
}

.detail {
  margin: 5px 0 0 8px;
  line-height: 25px;
}
</style>