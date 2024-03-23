import type { tokenItem } from "@/types/login";
import { http } from "@/utils/http";

/**
 * 用户登陆操作
 * @param openid 
 * @returns 
 */
export const loginAPI = (openid: string) => {
  return http<tokenItem>({
    method: 'POST',
    url: '/user/login',
    data: {
      openid: openid,
    }
  })
}

