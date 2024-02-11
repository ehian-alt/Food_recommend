import type { userInfo } from "@/types/userInfo";
import { http } from "@/utils/http";

export const getInfoByOpenid = (openid: string) => {
    return http<userInfo>({
        method: 'GET',
        url: '/user?openid='+openid
    })
}

export const updateMyInfoAPI = (myInfo:userInfo)=>{
    http({
        method:'PUT',
        data:myInfo,
        url:'/user'
    })
}

export const addUserAPI = (myInfo:userInfo)=>{
    http({
        method:'POST',
        url:'/user',
        data:myInfo
    })
}
