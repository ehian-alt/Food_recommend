// 评论信息类型

export type commentsItem = {
    /** 评论id */
    id: number,
    /** 评论者 */
    openid: string,
    /** 评论美食编号  */
    dishId: string,
    /** 评论时间 */
    createTime: string,
    /** 评分 */
    score: number,
    /** 内容 */
    content: string,
    /** 点赞数 */
    agree: number,
    /** 是否主页推荐 */
    state: number,
    /** 评论者头像 */
    avatarUrl: string,
    /** 评论者昵称 */
    nickName: string,
    /** 回复数量 */
    repliesNum: number,
    /** 评论图片列表 */
    images: string[]
    /** 评论的美食的图片 */
    image: string,
    /** 评论的美食的名称 */
    dishName: string,
    /** isStar */
    isStar: boolean,
    /** 标签序号 */
    tags: string,
    /** 标签列表 */
    tagList: number[]
}

// 回复信息类型

export type repliesItem = {
    /** 回复id */
    id: number,
    /** 回复的评论的评论id */
    replyId: number,
    /** 回复者id */
    openid: string,
    /** 回复时间 */
    replyTime: string,
    /** 文字内容 */
    content: string,
    /** 点赞数 */
    agree: number,
    /** 回复者头像 */
    avatarUrl: string,
    /** 回复者昵称 */
    nickName: string,

}

// 讨论区类型
export type forumItem = {
    /** 评论id */
    id: number,
    /** 评论者 */
    openid: string,
    /** 评论时间 */
    createTime: string,
    /** 内容 */
    content: string,
    /** 评论者头像 */
    avatarUrl: string,
    /** 评论者昵称 */
    nickName: string,
    /** 回复数量 */
    repliesNum: number,
    /** 论坛类型 */
    state: number,
    /** 好吃 */
    good: number,
    /** 一般 */
    just: number,
    /** 较差 */
    bad: number,
    /** 是否投票 */
    isVoted:boolean,
    /** Checked */
    checked:number
}

// 发送回复请求类型
export type replyParam = {
    /** 回复的哪一条 */
    replyId: string,
    /** 谁回复的 */
    openid: string,
    /** 回复的什么 */
    content: string
}

// 评论类型
export type newCommentParam = {
    /** 文字内容 */
    content: string,
    /** 图片云地址 */
    imagePath: string[],
    /** 评分 */
    rate: number,
    /** 是否首页推荐 */
    state: number,
    /**哪一个菜品的评价 */
    dishId: string,
    /** 谁发布的 */
    openid: string
}

