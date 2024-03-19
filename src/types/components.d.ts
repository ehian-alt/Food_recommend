import type homeGirdVue from "@/pages/home/components/homeGird.vue"
import type reclistVue from "@/pages/recommend/components/reclist/reclist.vue"
import type dishCommendVue from "@/pubcomp/dish/dishCommend/dishCommend.vue"

export type toastItem = {
    type: string,
    title: string,
    message: string,
    url: string,
    iconUrl: string
}

// 组件类型
export type recoListInstance = InstanceType<typeof reclistVue>

export type dishCommendInstance = InstanceType<typeof dishCommendVue>

export type girdInstance = InstanceType<typeof homeGirdVue>

