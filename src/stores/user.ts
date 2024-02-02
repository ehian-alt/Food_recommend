import {defineStore} from 'pinia'
import { ref } from 'vue';

export const useuserStore = defineStore(
    'user',
    ()=>{
        const userInfo = ref()

        const setUserInfo = (val:any) =>{
            userInfo.value = val;
        }

        const clearUserInfo = ()=>{
            userInfo.value = undefined
        }
        return {
            userInfo,
            setUserInfo,
            clearUserInfo
        }
    },
    {
        persist:{
            storage:{
                getItem(key){
                    return uni.getStorageSync(key)
                },
                setItem(key, value){
                    uni.setStorageSync(key, value)
                },
            },
        },
    }
)