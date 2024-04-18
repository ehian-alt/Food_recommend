<script lang="ts" setup>
import type { forumItem } from '@/types/comments';
import { ref,onMounted } from 'vue';
import { transFormatDate } from '@/services/comments';
import { useuserStore } from '@/stores/user';
import { getMyHelpForumService } from '@/services/forums';

const userStore = useuserStore();

/** 互助区域列表 */
const commentHelpList = ref<forumItem[]>([])

const getMyHelpForum = async (openid:string)=>{
  let result = await getMyHelpForumService(openid);
  commentHelpList.value = result.data;
}

onMounted(()=>{
  getMyHelpForum(userStore.userInfo.openid)
})

</script>

<template>
  <navigator class="commend-items" v-for="(item, id) in commentHelpList" :key="id"
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
  background-color: #fff;
  border-top: #efefef solid 2px;
  padding-left: 20px;
  position: relative;
  /* margin-bottom: 8px; */
  border-bottom: #f0f0f0 3px solid;
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
  margin: 20px 10px 5px 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.items-bottom {
  color: #808080;
  font-size: 12px;
  display: flex;
  align-items: center;
  margin: 5px 10px 10px 5px;
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