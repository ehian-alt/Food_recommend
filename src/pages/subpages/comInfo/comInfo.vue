<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import { commentByCommentId, forumByForumId, repliesByCommentId, repliesByForumId, transFormatDate } from '@/services/comments';
import type { commentsItem, repliesItem } from '@/types/comments';

const commentId = ref();
const forumId = ref();
const comment = ref<commentsItem>();
const replies = ref<repliesItem[]>([]);
const isForum = ref(false)
onLoad((query) => {
  console.log(query);
  commentId.value = query?.commentId;
  forumId.value = query?.forumId;
  if (commentId.value === undefined) {
    isForum.value = true;
  }
  console.log("isForum", isForum.value);
})

const getRecommendData = async () => {
  let comResult = await commentByCommentId(commentId.value);
  comment.value = comResult!.data;
  comment.value.createTime = transFormatDate(comment.value.createTime);
  let repResult = await repliesByCommentId(commentId.value);
  replies.value = repResult.data;
}

const getForumData = async () => {
  let forumResult = await forumByForumId(forumId.value);
  comment.value = forumResult.data;
  comment.value.createTime = transFormatDate(comment.value.createTime);
  let repResult = await repliesByForumId(forumId.value);
  replies.value = repResult.data;
}

onMounted(() => {
  // 根据commentId获取评论和评论的回复
  if (commentId.value) {
    getRecommendData();
    console.log("comment:", commentId.value);
    console.log("forum:", forumId.value);
  }
  if (forumId.value) {
    getForumData();
    console.log("comment:", commentId.value);
    console.log("forum:", forumId.value);
  }
})
const replyInput = ref<string>()
const replyButton = ()=>{
  if (replyInput.value!==undefined){
    console.log("回复内容:",replyInput.value);
    // 发送请求

    
  }
  else{
    uni.showToast({
      title:"内容不能为空!",
      icon:"error"
    })
  }
}


</script>

<template>
  <!-- 楼主 -->
  <view class="avatar-nickname">
    <image class="avatar-item" :src="comment?.avatarUrl" />
    <span class="nickname">{{ comment?.nickName }}</span>
    <uni-rate v-if="commentId !== undefined" :value="comment?.score" :readonly="true" />
  </view>
  <view class="contant"><text>{{ comment?.content }}</text></view>
  <!-- 图片 -->
  <swiper v-if="comment!.images !== undefined && comment!.images.length > 0" indicator-dots autoplay circular
    indicator-active-color="#efefef" :interval="3000" :duration="1000">
    <swiper-item class="swiper-item" v-for="imageUrl in comment?.images" :key="imageUrl">
      <view class="swiper-img">
        <image :src="imageUrl" mode="aspectFill"></image>
      </view>
    </swiper-item>
  </swiper>

  <view class="items-bottom">
    <span>----{{ "&ensp;" + comment?.createTime + "&ensp;" }}----&emsp;</span>
    <!-- 点赞 -->
    <image class="icons" src="@/static/icons/heart.png" /><span>{{ comment?.agree }}&emsp;</span>
  </view>

  <!-- 用户的回复 -->
  <view class="tit">评论/提问回复</view>
  <view class="reply-items" v-for="(item, key) in replies" :key="item.id">
    <view class="avatar-nickname">
      <!-- 回复者头像 -->
      <image class="avatar-item" :src="item.avatarUrl" />
      <span class="nickname">{{ item.nickName }}</span>
      <span class="nickname">{{ transFormatDate(item.replyTime) }}</span>
    </view>
    <view class="contant"><text>{{ item.content }}</text></view>
  </view>

  <!-- 回复按钮 -->
  <view class="fixed-footer">
    <uni-row class="demo-uni-row" :width="730">
      <uni-col :span="1">
        <view class="fill-block"></view>
      </uni-col>
        
      <uni-col :span="16">
        <view class="demo-uni-col dark">
          <input class="uni-input inp" placeholder="有什么想说的..." v-model="replyInput" />
        </view>
      </uni-col>

      <uni-col :span="1"><view class="fill-block"></view></uni-col>

      <uni-col :span="5">
        <button class="demo-uni-col light" @click="replyButton">
          回复
        </button>
      </uni-col>

      <uni-col :span="1"><view class="fill-block"></view></uni-col>
    </uni-row>
  </view>
</template>

<style scoped>
.fill-block{
  height: 36px;
  background-color: #efefef;
}
.inp{
  height: 36px;
  border-radius: 5px;
  box-shadow: 0 -1px 10px rgb(134, 131, 131);
}
.demo-uni-row {
  display: block;
}

.demo-uni-col {
  height: 36px;
  border-radius: 5px;
}

.dark {
  background-color: #f5f5f5;
}

.light {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffb6c1;
  box-shadow: 0 -1px 10px rgb(134, 131, 131);
}

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

.fixed-footer {
  position: fixed;
  left: 0;
  bottom: 10px;
  width: 100%;
  height: 36px;
  /* 底部栏的高度 */
  /* background-color: #333; */
  color: #808080;
  
  /* 添加阴影以美化 */
}
</style>