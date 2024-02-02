import { useuserStore } from "@/stores/user";
const baseURL = 'http://localhost:8080';
/**
 * 请求封装，
 * 拦截 request请求，
 * 拦截uploadFile文件上传
 */
const httpInterceptor = {
    // 拦截前
    invoke(options: UniApp.RequestOptions) {
        // 1.非http开头
        if (!options.url.startsWith('http')) {
            options.url = baseURL + options.url
        }
        // 2.请求超时设置为10s
        options.timeout = 10000
        // 3．添加小程序端请求头标识
        options.header = {
            ...options.header,
            'source-client': 'miniapp',
        }
        //4．添加token请求头标识
        const userStore = useuserStore()
        const token = userStore.userInfo?.token
        if (token) {
            options.header.Authorization = token
        }
        console.log(options)
    }

}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
    code: number,
    msg: string,
    data: T
}
/**
 * 
 * @param options 
 * @returns Promise
 */
export const http = <T>(options: UniApp.RequestOptions) => {
    // 返回Promise对象
    return new Promise<Data<T>>((reslove, reject) => {
        uni.request({
            ...options,
            // 请求成功
            success(res) {
                reslove(res.data as Data<T>)
            }
        })
    })
}
