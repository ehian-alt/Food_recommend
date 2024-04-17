<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import { commentByCommentId, repliesByCommentId, replyCommentService, transFormatDate } from '@/services/comments';
import type { commentsItem, repliesItem, replyParam } from '@/types/comments';
import { useuserStore } from '@/stores/user';
import { forumByForumId, repliesByForumId, replyForumService } from '@/services/forums';

const userStore = useuserStore();
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
// 根据commentId请求评论信息
const getRecommendData = async () => {
  let comResult = await commentByCommentId(commentId.value);
  comment.value = comResult!.data;
  comment.value.createTime = transFormatDate(comment.value.createTime);
  let repResult = await repliesByCommentId(commentId.value);
  replies.value = repResult.data;
}
// 根据forumId请求论坛讨论信息
const getForumData = async () => {
  let forumResult = await forumByForumId(forumId.value);
  comment.value = forumResult.data;
  comment.value.createTime = transFormatDate(comment.value.createTime);
  let repResult = await repliesByForumId(forumId.value);
  replies.value = repResult.data;
}
// 回复输入框
const replyInput = ref<string>()
// 回复请求参数
const replyParam = ref<replyParam>({
  replyId: isForum.value ? forumId.value : commentId.value,
  openid: userStore.userInfo.openid,
  content: ''
})
// 发起回复论坛的请求
const replyForum = async () => {
  await replyForumService(replyParam.value)
}
// 发起回复菜品评论的请求
const replyComment = async () => {
  await replyCommentService(replyParam.value)
}

onMounted(() => {
  // 根据commentId获取评论和评论的回复
  if (commentId.value) {
    getRecommendData();
  }
  // 如果是forumId则获取论坛问题及其的信息
  if (forumId.value) {
    getForumData();
  }
})
// 回复按钮函数
const replyButton = () => {
  if (replyInput.value !== undefined) {
    // 发送请求
    replyParam.value.content = replyInput.value;
    // 判断类型
    if (isForum.value) {
      // 是论坛则发送论坛相关请求
      replyParam.value.replyId = forumId.value;
      replyForum();
      getForumData();
    } else {
      // 是评论则发送菜品评论相关请求
      replyParam.value.replyId = commentId.value;
      console.log("发送commentId_replies", replyParam.value);
      replyComment();
      getRecommendData();
    }

    uni.showToast({
      title: "回复成功!",
      icon: "success"
    })
    replyInput.value = undefined
  }
  else {
    uni.showToast({
      title: "内容不能为空!",
      icon: "error"
    })
  }
}

</script>

<template>
  <!-- 楼主 -->
  <view style="background-color: #fff;">
    <view class="avatar-nickname">
      <image class="avatar-item" :src="comment?.avatarUrl" />
      <span class="nickname">{{ comment?.nickName }}</span>
      <uni-rate v-if="commentId !== undefined" :value="comment?.score" :readonly="true" />
    </view>
    <view class="contant"><text>{{ comment?.content }}</text></view>

    <!-- 图片, 报错-->
    <swiper v-if="comment!.images !== undefined && comment!.images.length > 0" indicator-dots autoplay circular
      indicator-active-color="#efefef" :interval="3000" :duration="1000">
      <swiper-item class="swiper-item" v-for="imageUrl in comment?.images" :key="imageUrl">
        <view class="swiper-img">
          <image :src="imageUrl" mode="aspectFill"></image>
        </view>
      </swiper-item>
    </swiper>

    <view class="items-bottom">
      <span>----{{ "&ensp;" + comment?.createTime + "&ensp;" }}----&emsp;&emsp;&emsp;</span>
      <!-- 浏览量 -->
      <!-- <image class="icons mar-rig" src="@/static/icons/eye.png" /><span>{{ comment?.agree }}&emsp;</span> -->
    </view>

    <navigator v-if="!isForum" class="dish-card" :url="`/pages/subpages/dishInfo/dishInfo?dishId=${comment?.dishId}&&isStar=${comment?.isStar}`">
      <image :src="comment?.image" class="dish-img" mode="aspectFill" />
      <uni-icons class="rig-icon" color="#808080" type="right" size="20"></uni-icons>
      <span class="card-name">{{ comment?.dishName }}</span>
    </navigator>

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
  </view>

  <!-- 回复 -->
  <view class="fixed-footer">
    <uni-row class="demo-uni-row" :width="730">
      <uni-col :span="1">
        <view class="fill-block"></view>
      </uni-col>

      <uni-col :span="16">
        <view class="demo-uni-col dark">
          <input class="uni-input inp" placeholder="&ensp;有什么想说的..." v-model="replyInput" />
        </view>
      </uni-col>

      <uni-col :span="1">
        <view class="fill-block"></view>
      </uni-col>

      <uni-col :span="5">
        <button class="demo-uni-col light rep-btn" @click="replyButton">
          回复
        </button>
      </uni-col>

      <uni-col :span="1">
        <view class="fill-block"></view>
      </uni-col>
    </uni-row>
  </view>
</template>

<style scoped>
.dish-card {
  margin: 0 10px 10px 42px;
  background-color: #efefef;
  border-radius: 5px;
  border: #c0c0c0 solid 1px;
  width: 75%;
  position: relative;
}
.card-name{
  position: relative;
  float: right;
  top: 10px;
}
.rig-icon{
  position: relative;
  float: right;
  right: 0;
  top: 10px;
}

.fill-block {
  height: 36px;
  background-color: #efefef;
}

.inp {
  height: 36px;
  border-radius: 100px;
  box-shadow: 1px 2px 5px 2px rgba(110, 110, 110, 0.3);
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

.rep-btn {
  color: #ffffff;
  box-shadow: 1px 2px 5px 2px rgba(110, 110, 110, 0.3);
}

.light {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffb6c1;
}

.dish-img {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 20px;
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
  border-bottom: 2px solid #efefef;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 20px;
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
  color: #808080;
}
</style>