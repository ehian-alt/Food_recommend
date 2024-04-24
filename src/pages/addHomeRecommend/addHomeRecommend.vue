<script lang="ts" setup>
import type { newCommentParam } from '@/types/comments';
import { ref } from 'vue';
import { useuserStore } from '@/stores/user';
import { newCommentService } from '@/services/comments';
const userStore = useuserStore();

const content = ref<string>()
let imageValue: string[] = [];

/** 新增评论的参数表单 */
const comData = ref<newCommentParam>({
  content: '',
  imagePath: [],
  rate: 3,
  state: 1,
  dishId: 'null',
  openid: userStore.userInfo.openid,
  notes: ''
})

const valueSe = ref(-1)
const sup = ref<string>()

const range = [
  { value: 0, text: '一食堂一楼' },
  { value: 1, text: '一食堂二楼' },
  { value: 2, text: '二食堂一楼' },
  { value: 3, text: '三食堂一楼' },
  { value: 4, text: '三食堂二楼' },
  { value: 5, text: '三食堂三楼' },
  { value: 6, text: '四食堂一楼' },
  { value: 7, text: '四食堂二楼' },
  { value: 8, text: '五食堂一楼' },
  { value: 9, text: '五食堂二楼' },
  { value: 10, text: '其他请在补充中写明' }
]

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

const comfireComment = async () => {
  comData.value.content = content.value as string;
  if (comData.value.content === undefined || valueSe.value === -1) {
    uni.showToast({
      icon: 'error',
      title: '请检查输入内容跟'
    })
    return
  }
  comData.value.notes = range[valueSe.value].text+sup.value;
  console.log(comData.value);
  // 给菜品评价

  // 上传云端
  getImagePaths()
  uni.showLoading({
    title: '正在发送请求',
    mask: true
  })
  setTimeout(() => {
    newComment(comData.value);
    uni.reLaunch({
      url: '/pages/home/home',
    })
  }, 1000);
}

</script>

<template>
  <view class="view-com pdlr">
    <textarea class="input-cont" v-model="content" placeholder="说点什么......" />
    <view class="data-se">
      <uni-data-select v-model="valueSe" :localdata="range" placeholder="请选择食堂"></uni-data-select>
    </view>

    <input class="view-com sup" v-model="sup" placeholder="位置补充信息。。" />

    <view class="tip">"此评论将会在首页推荐给其他用户"</view>
  </view>

  <view class="view-com pdlr">
    <view class="rate">评分</view>
    <uni-rate v-model="comData.rate" allow-half :is-fill="false" margin="20" />
  </view>

  <view class="view-com">
    <uni-file-picker limit="3" @select="select" @delete="deleteImg" title="最多上传3张图片"></uni-file-picker>
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

.data-se {
  width: 90%;
}

.sup{
  height: auto;
  width: 720rpx;
}

.input-cont {
  height: 100px;
  width: 720rpx;
}

.comfire-btn {
  border-radius: 10px;
  width: 90%;
  background-color: #ffb6c1;
  color: #ffffff;
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

.tip {
  text-align: center;
  color: #ffb6c1;
  margin: 15px 0 0;
  font-size: small;
}
</style>