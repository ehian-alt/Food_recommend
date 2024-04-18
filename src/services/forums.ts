import type { commentsItem, forumItem, newCommentParam, repliesItem, replyParam } from "@/types/comments";
import type { userVoteParam } from "@/types/forum";
import type { pageRequest, pageResult } from "@/types/global";
import { http } from "@/utils/http";

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
/**
 * 回复论坛，添加回复记录
 * @param replyParam 
 */
export const replyForumService = (replyParam:replyParam)=>{
    http({
        method:'POST',
        url:'/user/forum/reply',
        data:replyParam,
    })
}

/**
 * 论讨新发布讨论
 * @param comParam 
 */
export const newForumService = (comParam:newCommentParam)=>{
    http({
        method:"POST",
        url:"/user/forum",
        data:comParam,
    })
}

/**
 * 发起投票请求
 * @param votep 投票参数
 */
export const voteService = (votep:userVoteParam)=>{
    http({
        method:'POST',
        url:'/user/forum/vote',
        data:votep
    })
}

/**
 * 获取我的求助
 */
export const getMyHelpForumService = (openid:string)=>{
    return http<forumItem[]>({
        method:'GET',
        url:'/user/forum/myForum?openid='+openid,
    })
}

export const getMyVotesService = (openid:string)=>{
    return http<forumItem[]>({
        method:'GET',
        url:'/user/forum/myVote?openid='+openid,
    })
}