import type { commentsItem, repliesItem } from "@/types/comments";
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

