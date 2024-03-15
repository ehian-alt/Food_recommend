import type { dishItem, recoPar } from "@/types/dishInfoT";
import type { pageResult } from "@/types/global";
import { http } from "@/utils/http";

export const recommendService = (recommendParams: recoPar)=>{
    return http<pageResult<dishItem>>({
        method: 'POST',
        url: '/user/recommend',
        data:recommendParams
    })
}

export const userStarDish = (openId:string, dishId:string, stars:boolean)=>{
    http({
        method:'PUT',
        url:'/user/recommend',
        data: {
            openId:openId,
            dishId:dishId,
            stars:stars
        }
    })
}

export const dishInfoPage = (dishId:string) => {
    return http<dishItem>({
        method:'GET',
        url:'/user/recommend?dishId='+dishId,
    })
}

