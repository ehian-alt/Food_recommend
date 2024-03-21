<script lang="ts" setup>
import type { newCommentParam } from '@/types/comments';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useuserStore } from '@/stores/user';
import { newCommentService, newForumService } from '@/services/comments';
const userStore = useuserStore();
interface param {
  dishId: string,
  // 是否comment
  mode: string
}
const state = ref([
  { value: 0, text: "否" },
  { value: 1, text: "是" }
])

const pageParam = ref<param>()
const content = ref<string>()
let imageValue: string[] = [];

const comData = ref<newCommentParam>({
  content: '',
  imagePath: [],
  rate: 3,
  state: 1,
  dishId: pageParam.value?.dishId as string,
  openid: userStore.userInfo.openid
})

const select = (e: any) => {
  let t = e.tempFilePaths[0]
  imageValue.push(t)
}
const deleteImg = (e: any) => {
  let t = e.tempFilePath
  console.log("delete", e.tempFilePath);
  for (let i = 0; i < imageValue.length; i++) {
    if (t == imageValue[i]) {
      imageValue.splice(i, 1);
    }
  }
}

const getImagePaths = async () => {
  for (let i = 0; i < imageValue.length; i++) {
    uni.uploadFile({
      url: '/file/upload',
      fileType: 'image',
      filePath: imageValue[i],
      name: 'image',
      success: ({ data, statusCode }) => {
        if (statusCode === 200) {
          const imgurl = JSON.parse(data).data;
          comData.value.imagePath.push(imgurl);
        }
      },
    })
  }
}

const newComment = async (commentParam: newCommentParam) => {
  await newCommentService(commentParam);
}
const newForum = async (commentParam: newCommentParam) => {
  await newForumService(commentParam);
}

const comfireComment = async () => {
  comData.value.content = content.value as string;
  console.log(comData.value);
  if (pageParam.value?.mode === "1") {
    // 给菜品评价
    // 上传云端
    getImagePaths()
    uni.showLoading({
      title: '正在发送请求',
      mask: true
    })
    setTimeout(() => {
      newComment(comData.value);
      uni.navigateBack({
        delta: 1,//返回层数，2则上上页
      })
    }, 3000);

  } else {
    // 论坛发表，发送请求
    newForum(comData.value);
  }


}

onLoad((query) => {
  // 通过 query 可以获取传递的参数
  pageParam.value = query as param
  comData.value.dishId = query?.dishId;
});
</script>

<template>
  <view class="view-com pdlr">
    <textarea class="input-cont" v-model="content" placeholder="说点什么......" />
  </view>

  <view v-if="pageParam?.mode === '1'">
    <view class="view-com">
      <uni-file-picker limit="3" @select="select" @delete="deleteImg" title="最多上传3张图片"></uni-file-picker>
    </view>

    <view class="view-com pdlr">
      <view class="rate">评分</view>
      <uni-rate v-model="comData.rate" allow-half :is-fill="false" margin="20" />
    </view>

    <view class="view-com pdlr">
      <span>是否推荐到首页</span>
      <uni-data-checkbox class="setContain" v-model="comData.state" :localdata="state"></uni-data-checkbox>
    </view>
  </view>

  <view class="fixed-footer">
    <button class="comfire-btn" hover-class="button-hover" @click="comfireComment">
      确定发布
    </button>
  </view>
</template>

<style scoped>
.view-com {
  width: 100%;
  margin: 10px 0;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #fff;
}

.rate {
  padding-bottom: 10px;
}

.pdlr {
  padding-left: 10px;
  padding-right: 10px;
}

.mgr {
  margin-left: 20px;
}

.input-cont {
  height: 160px;
  width: 720rpx;
}

.comfire-btn {
  border-radius: 10px;
  width: 90%;
  background-color: #ffb6c1;
  color: #ffffff;
}

.setContain {
  float: right;
  text-align: right;
}

.fixed-footer {
  position: fixed;
  left: 0;
  bottom: 10px;
  width: 100%;
  height: 36px;
  /* 底部栏的高度 */
  color: #808080;
  padding-bottom: 5px;
}
</style>