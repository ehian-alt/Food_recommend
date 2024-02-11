import type { tokenItem } from "@/types/login";
import { http } from "@/utils/http";

export const loginAPI = (openid: string)=>{
    return http<tokenItem>({
        method: 'POST',
        url: '/user/login',
        data: {
          openid: openid,
        }
      })
}

