<script lang="ts" setup>
import { transFormatDate } from '@/services/comments';
import { getMyVotesService, voteService } from '@/services/forums';
import { useuserStore } from '@/stores/user';
import type { forumItem } from '@/types/comments';
import type { userVoteParam } from '@/types/forum';
import { ref, onMounted } from 'vue';

const userStore = useuserStore();
/** 投票参数 */
const voteParam = <userVoteParam>{}
/** 投票区域列表 */
const commentVoteList = ref<forumItem[]>([])
/** 投票选项 */
const voteItems = ref([
  { text: '好吃', value: 0 },
  { text: '一般', value: 1 },
  { text: '较差', value: 2 }
])
/** 发起投票请求函数 */
const voteThatDish = async (voteP:userVoteParam)=>{
  await voteService(voteP);
}
/** 投票按钮 */
const vote = (ind: number, forumId: number) => {
  console.log(ind);
  console.log(forumId);
  let che = commentVoteList.value[ind].checked
  if (che!==undefined) {
    // 准备参数
    voteParam.openid = userStore.userInfo.openid;
    voteParam.checked = che;
    voteParam.forumId = forumId;
    /** 发投票的请求 */
    voteThatDish(voteParam)
    /** 是否投票改为已投票 */
    commentVoteList.value[ind].isVoted=true;
    /** 票数 */
    che===0 ? commentVoteList.value[ind].good+=1 : che===1? commentVoteList.value[ind].just+=1 : commentVoteList.value[ind].bad+=1;
    /** 提示 */
    uni.showToast({
      title: '成功',
      icon: 'success',
      duration: 500
    })
  } else {
    uni.showToast({
      icon: 'error',
      title: '请先选择'
    })
  }
}

const getMyVotes = async (openid:string)=>{
  let result = await getMyVotesService(openid);
  commentVoteList.value = result.data;
}

onMounted(()=>{
  getMyVotes(userStore.userInfo.openid);
})
</script>

<template>
  <view class="commend-items" v-for="(item, key) in commentVoteList" :key="key">
    <!-- 头像，昵称 -->
    <view class="avatar-nickname">
      <image class="avatar-item" :src="item.avatarUrl" />
      <span class="nickname">{{ item.nickName }}</span>
    </view>
    <!-- 评论文字 -->
    <view class="contant"><text>{{ item.content }}</text></view>
    <!-- 投票结果 -->
    <view v-if="item.isVoted">
      <progress class="vote-item" :percent="index === 0 ? item.good : index === 1 ? item.just : item.bad"
        activeColor="#ffb6c1" :stroke-width="30" v-for="(vote, index) in voteItems" :key="index">
        <view class="vote-content">
          {{ vote.text }}
        </view>
        <view class="vote-count">
          {{ index === 0 ? item.good : index === 1 ? item.just : item.bad }} 票
        </view>
      </progress>

      <view style="height: 42px;">
        <span class="is-voted">已投票</span>
      </view>
    </view>
    <!-- 投票 -->
    <view v-else>
      <uni-data-checkbox mode="button" v-model="item.checked" selectedColor="#ffb6c1"
        :localdata="voteItems"></uni-data-checkbox>
      <view style="height: 42px;">
        <button :plain="true" size="mini" @click="vote(key, item.id)" class="vote-btn">投票</button>
      </view>
    </view>

    <view class="items-bottom">
      <span>----{{ "&ensp;" + transFormatDate(item.createTime) + "&ensp;" }}----&emsp;&emsp;&emsp;&emsp;</span>
    </view>
  </view>
</template>

<style scoped>

.is-voted{
  color: #ffb6c1;
  padding: 10px;
}
.vote-btn {
  margin-top: 10px;
  color: #ffffff;
  background-color: #ffb6c1;
  border-color: #ffb6c1;
  width: 235px;
  float: left;
}

.forum-area {
  text-align: center;
  height: 36px;
  padding-top: 10px;
  margin: auto;
  font-size: large;
}

.vote-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 5px;
}

.vote-content {
  width: 55px;
  position: relative;
  float: left;
  left: 10px;
}

.vote-count {
  position: relative;
  float: right;
  right: 100px;
}
.commend-items {
  background-color: #fff;
  border-top: #efefef solid 2px;
  padding-left: 20px;
  position: relative;
  /* margin-bottom: 5px; */
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
</style>