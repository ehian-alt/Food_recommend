import type reclistVue from "@/pages/recommend/components/reclist/reclist.vue"

export type toastItem = {
    type: string,
    title: string,
    message: string,
    url: string,
    iconUrl: string
}

export type recoListInstance = InstanceType<typeof reclistVue>

