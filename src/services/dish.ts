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


