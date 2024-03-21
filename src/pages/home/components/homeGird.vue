<script setup lang="ts">
import type { commentsItem } from '@/types/comments';
import { ref, onMounted } from 'vue'
import { commentItemListService } from '@/services/comments'
import type { pageRequest } from '@/types/global';
import { useuserStore } from '@/stores/user';
import { onLoad } from '@dcloudio/uni-app';
import { http } from '@/utils/http';
const userStore = useuserStore();

onLoad(()=>{
    http({
        method:'GET',
        url:'/user/isLogin',
    })
})

const pageReq = <pageRequest>({
    page: 1,
    pageSize: 10,
    openid: userStore.userInfo.openid,
    supply: 1
})

const commentItems = ref<commentsItem[]>([])

let finshList = ref(false); // 是否全部加载完
const getCommendItems = async () => {
    if (finshList.value) {
        return
    }
    let result = await commentItemListService(pageReq);
    commentItems.value.push(...result.data.items);
    // 页数判断是否加载完成
    if (pageReq.page < result.data.pageCount) {
        pageReq.page += 1
    } else {
        finshList.value = true
    }
}

onMounted(() => {
    // 发送含推荐的请求
    getCommendItems();
})

defineExpose({
    getCommendItems
})
</script>

<template>
    <!-- 首页宫格 -->
    <view class="gird-container">
        <navigator class="aitems" v-for="item in commentItems" :key="item.id"
            :url="`/pages/subpages/comInfo/comInfo?commentId=${item.id}`">
            <!-- 图片 -->
            <image class="img-item" :src="item.images[0]" mode="aspectFill" />
            <p class="text-item">{{ item.content }}</p>
            <!-- 头像 -->
            <image class="avatar-item" :src="item.avatarUrl" />
            <!-- 昵称 -->
            <span class="nick-name">{{ item.nickName }}</span>
            <!-- 点赞 -->
            <view class="likes" @tap="">
                <image v-if="true" class="icons" src="@/static/icons/eye.png" />
                <span>{{ item.agree }}</span>
            </view>
        </navigator>
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

.aitems {
    padding: 10px 2% 5px 2%;
    margin: 0 1% 5px 1%;
    border-radius: 4px;
    width: 47%;
    box-sizing: border-box;
    background-color: #ffffff;
    /* background-color: #ffb6c1; */
}

.img-item {
    width: 160px;
    height: 160px;
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

.nick-name {
    float: left;
    font-size: small;
    color:#343434;
    margin-left: 5px;
    padding-top: 8px;
}

.likes {
    display: flex;
    align-items: center;
    float: right;
    vertical-align: middle;
    color: #808080;
}

.icons {
    padding: 0.3rem 0;
    height: 1.4rem;
    width: 1.4rem;
}
</style>