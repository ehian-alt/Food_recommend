<script setup lang="ts">
import { ref } from 'vue'
const commendList = ref([{
    id: Number,
    imgsrc: 'https://img.yzcdn.cn/vant/cat.jpeg'
}, {
    id: Number,
    imgsrc: 'https://img.yzcdn.cn/vant/apple-1.jpg'
}, {
    id: Number,
    imgsrc: 'https://img.yzcdn.cn/vant/apple-3.jpg'
}, {
    id: Number,
    imgsrc: 'https://img.yzcdn.cn/vant/apple-2.jpg'
}, {
    id: Number,
    imgsrc: 'https://img.yzcdn.cn/vant/cat.jpeg'
}, {
    id: Number,
    imgsrc: 'https://img.yzcdn.cn/vant/cat.jpeg'
}, {
    id: Number,
    imgsrc: 'https://img.yzcdn.cn/vant/apple-4.jpg'
}, {
    id: Number,
    imgsrc: 'https://img.yzcdn.cn/vant/apple-1.jpg'
}, {
    id: Number,
    imgsrc: 'https://img.yzcdn.cn/vant/cat.jpeg'
}, {
    id: Number,
    imgsrc: 'https://img.yzcdn.cn/vant/apple-2.jpg'
}])

</script>

<template>
    <!-- 首页宫格 -->
    <view class="gird-container">
        <view class="aitems" v-for="item in commendList" :key="item.id">
            <!-- 图片 -->
            <image class="img-item" :src="item.imgsrc" mode="widthFix" />
            <p class="text-item">abcdefghijklmnopqrstuvwxyzahdahjafkhdkahkjahfahfkhafasfjkhfhsakfjhasdkfhajkhakjhfjashf</p>
            <!-- 头像 -->
            <image class="avatar-item" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <!-- 点赞 -->
            <view class="likes" @tap="">
                <span>11</span>
                <image v-if="true" class="icons" src="@/static/icons/heart.png" />
                <image v-else class="icons" src="@/static/icons/heart-fill.png" />
            </view>
        </view>
    </view>
</template>

<style scoped>
.gird-container {
    /* position: relative; */
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    align-items: flex-start;
}
.aitems{
    flex: 1;
    padding: 10px 2% 5px 2%;
    margin: 0 1% 5px 1%;
    border-radius: 4px;
    width: 44%;
    box-sizing: border-box;
    /* background-color: #ffffff; */
    background-color: #ffb6c1;
}
.aitems:nth-child(2n-1) {
    float: left;
    float: top;
}
.aitems:nth-child(2n){
    float: top;
    float: left;
}
.img-item {
    border-radius: 4px;
    overflow: hidden;
    background-color: rgb(183, 184, 183);
    width: 100%;
}

.text-item {
    padding: 3px 0;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    height: 100%;
}

.avatar-item {
    float: left;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
}

.likes {
    display: flex;
    align-items: center;
    float: right;
    vertical-align: middle;
}

.icons {
    padding: 0.3rem 0;
    height: 1.4rem;
    width: 1.4rem;
}
</style>