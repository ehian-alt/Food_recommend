export type queryDishId = {
    dishId:string
}

export type dishItem = {
    /** 菜品的id */
    dishId: string
    /** 窗口编号 */
    shopId: string
    /** 食堂 */
    canteen: number
    /** 菜名 */
    dishName: string
    /** 价格 */
    price: number
    /** 评分 */
    score: number
    /** 创建时间 */
    createTime: Date
    /** 图片路径 */
    image: string
    /** 菜品辣度 */
    spicy: number
    /** 菜品咸淡 */
    salinity: number
}

export type recoPar = {
    /** 第几页 */
    page: number,
    /** 每页多少条 */
    pageSize: number,
    /** 食堂 */
    canteen: number,
    /** 辣度 */
    spicy: number,
    /** 咸淡 */
    salinity: number
}
