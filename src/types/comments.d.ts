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