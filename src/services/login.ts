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

/**
 * 获取数据库标签列表
 * @returns 标签列表
 */
export const getTagsService = ()=>{
  return http<string[]>({
    method:'GET',
    url:'/user/tags',
  })
}