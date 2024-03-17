// 评论信息类型

export type commentsItem = {
    /** 评论id */
    id:number,
    /** 评论者 */
    openid:string,
    /** 评论美食编号  */
    dishId:string,
    /** 评论时间 */
    commentTime:string,
    /** 评分 */
    score:number,
    /** 内容 */
    content:string,
    /** 点赞数 */
    agree:number,
    /** 是否主页推荐 */
    state:number,
    /** 评论者头像 */
    avatarUrl:string,
    /** 评论者昵称 */
    nickName:string,
    /** 回复数量 */
    repliesNum:number,
    /** 评论图片列表 */
    images:[string,]
}

// 回复信息类型

export type repliesItem = {
    /** 回复id */
    id:number,
    /** 回复的评论的评论id */
    commentId:number,
    /** 回复者id */
    openid:string,
    /** 回复时间 */
    replyTime:string,
    /** 文字内容 */
    content:string,
    /** 点赞数 */
    agree:number,
    /** 回复者头像 */
    avatarUrl:string,
    /** 回复者昵称 */
    nickName:string,

}