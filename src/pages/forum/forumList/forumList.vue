<script lang="ts" setup>
import { transFormatDate } from '@/services/comments';
import { forumListService, voteService } from '@/services/forums'
import type { pageRequest } from '@/types/global';
import type { forumItem } from '@/types/comments';
import type { userVoteParam } from '@/types/forum.d.ts';
import { onMounted, ref } from 'vue';
import { useuserStore } from '@/stores/user';
import { onPullDownRefresh } from '@dcloudio/uni-app';

const userStore = useuserStore();

/** 投票区域列表 */
const commentVoteList = ref<forumItem[]>([])
/** 互助区域列表 */
const commentHelpList = ref<forumItem[]>([])

const pageReq = <pageRequest>{
  page: 1,
  pageSize: 10,
  openid: userStore.userInfo.openid,
  supply: 1
}
// 论坛请求
// 是否全部加载完
let finshList = ref(false);
const getForumItemList = async () => {
  if (finshList.value) {
    return
  }
  let result = await forumListService(pageReq)
  if (pageReq.supply === 1) {
    commentVoteList.value.push(...result.data.items);
  } else {
    commentHelpList.value.push(...result.data.items);
  }

  if (pageReq.page < result.data.pageCount) {
    pageReq.page += 1
  } else {
    finshList.value = true
  }
}

/** 触底加载 */
onPullDownRefresh(() => {
  setTimeout(() => {
    getForumItemList();
    uni.stopPullDownRefresh();  //停止刷新
  }, 1000)
})

/** 区域颜色 */
const voteColor = ref('#ffb6c1')
const helpColor = ref('#000000')

/** 切换区域 */
const tabArea = (area: number) => {
  pageReq.supply = area;
  pageReq.page = 1;
  finshList.value = false;
  if (area === 1) {
    // 投票
    voteColor.value = '#ffb6c1';
    helpColor.value = '#000000';
    commentVoteList.value = [];
  } else {
    // 互助
    helpColor.value = '#ffb6c1';
    voteColor.value = '#000000';
    commentHelpList.value = [];
  }
  getForumItemList();
}

/** 投票参数 */
const voteParam = <userVoteParam>{}

/** 发起投票请求函数 */
const voteThatDish = async (voteP:userVoteParam)=>{
  await voteService(voteP);
}

/** 投票选项 */
const voteItems = ref([
  { text: '好吃', value: 0 },
  { text: '一般', value: 1 },
  { text: '较差', value: 2 }
])
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
    /** 给投票设置一下 */
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

onMounted(() => {
  getForumItemList();
})
defineExpose({
  getForumItemList
})
</script>

<template>
  <uni-row class="demo-uni-row" :width="730">
    <uni-col :span="12">
      <view class="forum-area" :style="{ color: voteColor }" @click="tabArea(1)">投票区域</view>
    </uni-col>
    <uni-col :span="12">
      <view class="forum-area" :style="{ color: helpColor }" @click="tabArea(0)">互助区域</view>
    </uni-col>
  </uni-row>

  <view v-if="pageReq.supply === 1" class="commend-items" v-for="(item, key) in commentVoteList" :key="key">
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

  <navigator v-if="pageReq.supply === 0" class="commend-items" v-for="(item, id) in commentHelpList"
    :key="id" :url="`/pages/subpages/comInfo/comInfo?forumId=${item.id}`">
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
  border-top: #efefef solid 2px;
  padding-left: 20px;
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
  margin: 20px 10px 5px 5px;
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