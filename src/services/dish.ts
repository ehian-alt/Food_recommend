import type { dishItem, recoPar } from "@/types/dishInfoT";
import type { pageResult } from "@/types/global";
import { http } from "@/utils/http";

/**
 * 榜单,筛选查询
 * @param recommendParams 
 * @returns 
 */
export const recommendService = (recommendParams: recoPar)=>{
    return http<pageResult<dishItem>>({
        method: 'POST',
        url: '/user/recommend',
        data:recommendParams
    })
}
/**
 * 用户收藏/取消收藏操作
 * @param openId 
 * @param dishId 
 * @param stars 
 */
export const userStarDish = (openId:string, dishId:string, stars:boolean)=>{
    http({
        method:'PUT',
        url:'/user/recommend',
        data: {
            openid:openId,
            dishId:dishId,
            stars:stars
        }
    })
}
/**
 * 根据菜品id检索该菜品
 * @param dishId 
 * @returns 
 */
export const dishInfoPage = (dishId:string) => {
    return http<dishItem>({
        method:'GET',
        url:'/user/dishInfo?dishId='+dishId,
    })
}
/**
 * 榜单关键词搜索
 * @param keyWord 
 * @param openid 
 * @returns 
 */
export const searchService = (keyWord:string, openid:string)=>{
    return http<dishItem[]>({
        method:'GET',
        url:'/user/recommend/search',
        data:{
            keyWord:keyWord,
            openid:openid
        }
    })
}
