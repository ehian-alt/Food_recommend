import type { commentsItem, forumItem, repliesItem } from "@/types/comments";
import type { pageRequest, pageResult } from "@/types/global";
import { http } from "@/utils/http";
/**
 * 根据菜品id获取该菜品所有评论
 * @param dishId 
 * @returns 
 */
export const commentsByDish = (dishId: string) => {
    return http<commentsItem[]>({
        method: 'GET',
        url: '/user/comment?dishId=' + dishId,
    })
}
/**
 * 根据评论id获取评论信息
 * @param commentId 
 * @returns 
 */
export const commentByCommentId = (commentId: number) => {
    return http<commentsItem>({
        method: 'GET',
        url: '/user/comment/comment?commentId=' + commentId,
    })
}

/**
 * 根据评论id获取回复信息
 * @param commentId 
 * @returns 
 */
export const repliesByCommentId = (commentId: number) => {
    return http<repliesItem[]>({
        method: 'GET',
        url: '/user/comment/replies?commentId=' + commentId,
    })
}

/**
 * 将时间戳转化成格式为MM/DD hh:mm 的时间字符串
 * @param dateTime 
 * @returns 
 */
export const transFormatDate = (dateTime:string)=>{
    let date = new Date(dateTime);
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let formattedDate = `${month}/${day} ${hours}:${minutes}`;
    return formattedDate;
}
/**
 * 根据页面分页请求推荐
 * @param pageReq 
 * @returns 
 */
export const commentItemListService = (pageReq:pageRequest)=>{
    return http<pageResult<commentsItem>>({
        method:'GET',
        url:'/user/home',
        data:pageReq
    })
}

/**
 * 根据页面分页请求论坛
 * @param pageReq 
 * @returns 
 */
export const forumListService = (pageReq:pageRequest)=>{
    return http<pageResult<forumItem>>({
        method:'GET',
        url:'/user/forum',
        data:pageReq
    })
}
/**
 * 根据forumid请求讨论
 * @param forumId 
 * @returns 
 */
export const forumByForumId = (forumId:number) =>{
    return http<commentsItem>({
        method:'GET',
        url:'/user/forum/forum?forumId='+forumId,
    })
}
/**
 * 根据forumID获取该问题下的回复
 * @param forumId 
 * @returns 
 */
export const repliesByForumId = (forumId:number)=>{
    return http<repliesItem[]>({
        method:'GET',
        url:'/user/forum/replies?forumId='+forumId,
    })
}

