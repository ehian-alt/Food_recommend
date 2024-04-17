<script lang="ts" setup>
import { commentsByDish, transFormatDate } from '@/services/comments';
import type { commentsItem } from '@/types/comments';
import type { pageRequest } from '@/types/global';
import { onMounted, toRefs, ref } from 'vue';
import { useuserStore } from '@/stores/user';

const userStore = useuserStore();

interface dish {
  dishId: string
}
const props = defineProps<dish>();
const { dishId } = toRefs(props);
/** 显示评论 */
const commentList = ref<commentsItem[]>([])

/** 所有评论存储 */
const allComment = ref<commentsItem[]>([])

// 标签列表
const tags = ref<string[]>()
/** 评论标签 {序号, 是否选中} */
const tagNo = new Map<number, boolean>()
onMounted(async () => {
  // 数据库所有标签
  uni.getStorage({
    key: "tags",
    success: (success) => {
      let obs = success.data
      if (obs) {
        tags.value = JSON.parse(obs);

      }
    },
  })

  // 查询菜品为dishId的评论
  let result = await commentsByDish(dishId.value);
  commentList.value = result.data;
  allComment.value = result.data;

  for (let i = 0; i < commentList.value.length; i++) {
    // 日期格式
    commentList.value[i].createTime = transFormatDate(commentList.value[i].createTime);
    // 获取标签编号
    let inp = commentList.value[i].tags
    const matches = inp.match(/\d+/g);
    let tl = matches?.map(Number) as number[];
    console.log(i, " 标签列表 ", ...tl);
    
    allComment.value[i].tagList = tl;
    
    for (let index = 0; index < tl.length; index++) {
      tagNo.set(tl[index], true);
    }
  }

})

const pageReq = <pageRequest>{
  page: 1,
  pageSize: 10,
  openid: userStore.userInfo.openid,
  supply: 0
}

let checked = -1;

const setInverted = (tag: number) => {
  console.log(tag);

  if (checked !== -1) {
    tagNo.set(checked, true);
  }
  tagNo.set(tag, false);
  checked = tag;

  console.log(tagNo);
  // 筛选出含有这个标签的评论
  commentList.value = []
  for (let i = 0; i < allComment.value.length; i++) {
    if (allComment.value[i].tagList.indexOf(tag) !== -1) {
      commentList.value.push(allComment.value[i])
    }
  }

}

</script>

<template>

  <scroll-view class="scroll-view_H" :scroll-x="true">
    <block v-for="(item, key) in tagNo" :key="key">
      <uni-tag class="tags" :circle="true" :inverted="tagNo.get(item[0])" :text="tags![item[0] - 1]" type="primary"
        @click="setInverted(item[0])" />
    </block>
  </scroll-view>


  <navigator class="commend-items" v-for="(item, id) in commentList" :key="item.id"
    :url="`/pages/subpages/comInfo/comInfo?commentId=${item.id}`">
    <!-- 头像，昵称，评分 -->
    <view class="avatar-nickname">
      <image class="avatar-item" :src="item.avatarUrl" />
      <span class="nickname">{{ item.nickName }}</span>
      <uni-rate :value="item.score" :readonly="true" />
    </view>
    <!-- 评论文字 -->
    <view class="contant"><text>{{ item.content }}</text></view>
    <!-- 图片（可选） 要用v-for写 -->
    <view class="com-pics">
      <image class="compic-item" mode="aspectFill" v-for="(image, key) in item.images" :key="key" :src="image"></image>
    </view>
    <!-- 其他信息，时间，回复数量，浏览量 -->
    <view class="items-bottom">
      <span>----{{ "&ensp;" + item.createTime + "&ensp;" }}----&emsp;</span>
      <!-- 回复图标 -->
      <image class="icons" src="@/static/icons/message.png" /><span>&ensp;{{ item.repliesNum }}&ensp;&ensp;</span>
      <!-- 点赞 -->
      <image class="icons" src="@/static/icons/eye.png" /><span>&ensp;{{ item.agree }}&emsp;</span>
      <span class="right-bottom">查看详情></span>
    </view>
  </navigator>
</template>

<style scoped>
.scroll-view_H {
  white-space: nowrap;
  /* 滚动必须加的属性 */
  width: 100%;
  height: 26px;
  padding: 20rpx;
}

.tags {
  margin-right: 10px;
}

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