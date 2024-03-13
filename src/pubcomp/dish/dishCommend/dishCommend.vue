<script lang="ts" setup>
import { onMounted, toRefs, ref } from 'vue';
interface dish {
  dishId?:string
}
const props = defineProps<dish>();
const { dishId } = toRefs(props);

const rateValue = ref(3)

</script>

<template>
  <navigator class="commend-items" v-for="(item, key) in 10" :key="1" :url="`/pages/subpages/comInfo/comInfo?commendId=${ key }`">
    <!-- 头像，昵称，评分 -->
    <view class="avatar-nickname">
      <image class="avatar-item" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <span class="nickname">{{ "昵称昵称" }}</span>
      <uni-rate :value="rateValue" :readonly="true"/>
    </view>
    <!-- 评论文字 -->
    <view class="contant"><text>评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字</text></view>
    <!-- 图片（可选） 要用v-for写 -->
    <view class="com-pics" >
      <image class="compic-item" mode="aspectFill" v-for="item in 3" :key="1" src="https://img.yzcdn.cn/vant/cat.jpeg"></image>
    </view>
    <!-- 其他信息，时间，回复数量，点赞信息 -->
    <view class="items-bottom">
      <span>----{{ "&ensp;2/24/18:00&ensp;" }}----&emsp;</span>
      <!-- 回复图标 -->
      <image class="icons" src="@/static/icons/message.png"/><span>11&emsp;</span>
      <!-- 点赞 -->
      <image class="icons" src="@/static/icons/heart.png"/><span>6&emsp;</span>
      <span class="right-bottom">查看详情></span>
    </view>
  </navigator>
</template>

<style scoped>
.commend-items {
  margin-left: 5px;
  position: relative;
  /* border-top: #f0f0f0 1px solid; */
  border-bottom: #f0f0f0 2px solid;
}
.avatar-nickname{
  position:relative;
  display: flex;
  align-items: center; /* 垂直居中 */
  top:10px;
  left:0;
}
.avatar-item {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
}

.nickname {
  margin:0 10px;
  font-size: 14px;
  color: #808080;
}

.contant{
  margin: 5px 10px 5px 42px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.com-pics{
  /* display: flex; */
  margin-left: 42px;
  width:300px;
}
.compic-item{
  display: inline-block;
  width:100px;
  height:100px;
  background-color:#efefef;
}
.items-bottom{
  color:#808080;
  font-size:12px;
  display: flex;
  margin:5px 10px 10px 42px;
}
.icons {
    height: 1.2rem;
    width: 1.2rem;
}
.right-bottom{
  position:absolute;
  right:12px;
  bottom:12px;
}
</style>