<script lang="ts" setup>
const props = defineProps();
</script>

<template>
  <view>
    <!-- 美食图片 -->
    <image class="dish-bigpic" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="aspectFill" />
    <!-- 美食信息 -->
    <view class="dish-info">
      <!-- 美食名称 -->
      <view class="bigname"><text class="dishName">这是个菜名这是个菜名这是个菜名这是个菜名</text></view>
      <!-- 收藏 -->
      <view class="star">
        <image v-if="true" class="icons" src="@/static/icons/star.png" />
        <image v-else class="icons" src="@/static/icons/star-fill.png" />
        <br>
        收藏
      </view>
      <view class="canteen">{{ "一食堂" }}</view>
      <!-- 价格 -->
      <view class="price"><span class="dolle-fu">￥</span>{{ 8.88 }}</view>
      <!-- 食堂导航 -->
      <view class="location">
        <image class="icons ty-icon" src="@/static/icons/location-fill.png"/>
        <span>导航</span>
      </view>
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
  top: 10px;
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
.canteen{
  color: #808080;
  position: absolute;
  left: 20px;
  top: 80px;
}
.price{
  position: absolute;
  left: 20px;
  bottom: 10px;
  font-size: 23px;
  color:#ee3f4d;
}
.dolle-fu{
  font-size: 16px;
}
.location{
  position: absolute;
  bottom: 20px;
  right: 25px;
}
.ty-icon{
  transform: translateY(20%);
}
</style>