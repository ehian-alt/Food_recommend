<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import { commentByCommentId, repliesByCommentId, transFormatDate } from '@/services/comments';
import type { commentsItem, repliesItem } from '@/types/comments';

let commentId = ref();
const comment = ref<commentsItem>();
const replies = ref<repliesItem[]>([]);
onLoad((query) => {
  console.log(query);

  commentId.value = query?.commentId;
})
onMounted(async () => {
  // 根据commentId获取评论和评论的回复
  let comResult = await commentByCommentId(commentId.value);
  comment.value = comResult!.data;
  comment.value.commentTime = transFormatDate(comment.value.commentTime);
  let repResult = await repliesByCommentId(commentId.value);
  replies.value = repResult.data;
  for (let i = 0; i < replies.value.length; i++) {
    replies.value[i].replyTime = transFormatDate(replies.value[i].replyTime);
  }
})
</script>

<template>
  <!-- 楼主 -->
  <view class="avatar-nickname">
    <image class="avatar-item" :src="comment?.avatarUrl" />
    <span class="nickname">{{ comment?.nickName }}</span>
    <uni-rate :value="comment?.score" :readonly="true" />
  </view>
  <view class="contant"><text>{{ comment?.content }}</text></view>
  <!-- 图片 -->
  <swiper v-if="comment!.images" indicator-dots autoplay circular indicator-active-color="#efefef"
    :interval="3000" :duration="1000">
    <swiper-item class="swiper-item" v-for="(imageUrl, key) in comment?.images" :key="key">
      <view class="swiper-img">
        <image :src="imageUrl" mode="aspectFill"></image>
      </view>
    </swiper-item>
  </swiper>

  <view class="items-bottom">
    <span>----{{ "&ensp;" + comment?.commentTime + "&ensp;" }}----&emsp;</span>
    <!-- 点赞 -->
    <image class="icons" src="@/static/icons/heart.png" /><span>{{ comment?.agree }}&emsp;</span>
  </view>

  <!-- 回复 -->
  <view class="tit">评论/提问回复</view>
  <view class="reply-items" v-for="(item, key) in replies">
    <view class="avatar-nickname">
      <!-- 回复者头像 -->
      <image class="avatar-item" :src="item.avatarUrl" />
      <span class="nickname">{{ item.nickName }}</span>
      <span class="nickname">{{ item.replyTime }}</span>
    </view>
    <view class="contant"><text>{{ item.content }}</text></view>
  </view>
</template>

<style scoped>
.avatar-nickname {
  margin-left: 10px;
  position: relative;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  top: 10px;
  left: 0;
}

.swiper-item {
  text-align: center;
  background-color: #fdfdfd;
  height: 100%;
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
  margin: 5px 10px 5px 52px;
  display: -webkit-box;
  /*-webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;*/
}

.tit {
  padding-bottom: 5px;
  padding-left: 20px;
  width: 100%;
  border-bottom: 1px solid #808080;
  color: #707070;
  font-size: 14px;
}

.reply-items {
  margin-top: 5px;
  margin-left: 20px;
}

.items-bottom {
  color: #808080;
  font-size: 12px;
  display: flex;
  margin: 5px 10px 10px 42px;
}

.icons {
  height: 1.2rem;
  width: 1.2rem;
}
</style>