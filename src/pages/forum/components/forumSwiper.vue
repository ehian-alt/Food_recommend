<script lang="ts" setup>
import { ref } from 'vue'
// 轮播图数据
const swiperList = ref([{
    id: Number,
    imgSrc: 'https://jju-dish-recommend.oss-cn-hangzhou.aliyuncs.com/781a998b3d184b23ef655ca7b6bb45aa.jpeg'
}, {
    id: Number,
    imgSrc: 'https://jju-dish-recommend.oss-cn-hangzhou.aliyuncs.com/e077716f57c57d9733d57632d536aa7d.jpg'
}])
// 请求轮播图数据


</script>

<template>
    <view>
        <!-- 轮播图 -->
        <swiper indicator-dots autoplay circular indicator-active-color="#efefef" :interval="3000" :duration="1000">
            <swiper-item class="swiper-item" v-for="item in swiperList" :key="item.id">
                <view class="swiper-img">
                    <image :src="item.imgSrc" mode="aspectFill"></image>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<style scoped>
.swiper-item {
    text-align: center;
    background-color: #fdfdfd;
    height: 100%;
}
</style>