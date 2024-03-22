<script lang="ts" setup>
import { forumListService, transFormatDate } from '@/services/comments';
import type { pageRequest } from '@/types/global';
import type { forumItem } from '@/types/comments'
import { onMounted, ref } from 'vue';
import { useuserStore } from '@/stores/user';
import { onPullDownRefresh } from '@dcloudio/uni-app';

const userStore = useuserStore();

const commentList = ref<forumItem[]>([])

const pageReq = <pageRequest>{
  page: 1,
  pageSize: 10,
  openid:userStore.userInfo.openid,
  supply:0
}
// 论坛请求
// 是否全部加载完
let finshList = ref(false);
const getForumItemList = async () => {
  if (finshList.value) {
    return
  }
  let result = await forumListService(pageReq)
  commentList.value.push(...result.data.items)

  if (pageReq.page < result.data.pageCount) {
    pageReq.page += 1
  } else {
    finshList.value = true
  }
}

onPullDownRefresh(()=>{
  setTimeout(()=>{
    finshList.value = false;
    commentList.value=[]
    getForumItemList();
    uni.stopPullDownRefresh();  //停止刷新
  }, 1000)
})

onMounted(()=>{
  getForumItemList();
})
defineExpose({
  getForumItemList
})
</script>

<template>
  <navigator class="commend-items" v-for="item in commentList" :key="item.id"
    :url="`/pages/subpages/comInfo/comInfo?forumId=${item.id}`">
    <!-- 头像，昵称 -->
    <view class="avatar-nickname">
      <image class="avatar-item" :src="item.avatarUrl" />
      <span class="nickname">{{ item.nickName }}</span>
    </view>
    <!-- 评论文字 -->
    <view class="contant"><text>{{ item.content }}</text></view>
    <!-- 其他信息，时间，回复数量 -->
    <view class="items-bottom">
      <span>----{{ "&ensp;" + transFormatDate(item.createTime) + "&ensp;" }}----&emsp;&emsp;&emsp;&emsp;</span>
      <!-- 回复图标 -->
      <image class="icons" src="@/static/icons/message.png" /><span>&ensp;{{ item.repliesNum }}&emsp;</span>
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

.avatar-nickname {
  position: relative;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  top: 10px;
  left: 0;
}

.avatar-item {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
}

.nickname {
  margin: 0 10px;
  font-size: 14px;
  color: #808080;
}

.contant {
  margin: 5px 10px 5px 42px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.com-pics {
  /* display: flex; */
  margin-left: 42px;
  width: 300px;
}

.compic-item {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #efefef;
}

.items-bottom {
  color: #808080;
  font-size: 12px;
  display: flex;
  align-items: center;
  margin: 5px 10px 10px 42px;
}

.icons {
  height: 1.2rem;
  width: 1.2rem;
}

.right-bottom {
  position: absolute;
  right: 12px;
  bottom: 12px;
}
</style>