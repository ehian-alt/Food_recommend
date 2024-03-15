import type { commentsItem } from "@/types/comments";
import { http } from "@/utils/http";

export const commentsByDish = (dishId:string)=>{
    return http<commentsItem[]>({
        method:'GET',
        url:'/user/comment?dishId='+dishId,
    })
}