import type { dishItem, recoPar } from "@/types/dishInfoT";
import type { pageResult } from "@/types/global";
import type { userInfo } from "@/types/userInfo";
import { http } from "@/utils/http";
/**
 * 通过openid获取该用户信息
 * @param openid 
 * @returns 
 */
export const getInfoByOpenid = (openid: string) => {
    return http<userInfo>({
        method: 'GET',
        url: '/user?openid='+openid
    })
}
/**
 * 用户信息更新修改
 * @param myInfo 
 */
export const updateMyInfoAPI = (myInfo:userInfo)=>{
    http({
        method:'PUT',
        data:myInfo,
        url:'/user'
    })
}
/**
 * 添加用户
 * @param myInfo 
 */
export const addUserAPI = (myInfo:userInfo)=>{
    http({
        method:'POST',
        url:'/user/new',
        data:myInfo
    })
}
/**
 * 我的收藏，获取openid的用户的收藏菜品列表
 * @param recoParam 
 * @returns 
 */
export const myStarDishService = (recoParam:recoPar)=>{
    return http<pageResult<dishItem>>({
        method:'GET',
        url:'/user/myStar',
        data:recoParam,
    })
}
