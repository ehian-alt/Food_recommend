// 分页请求返回数据类型
export type pageResult<T> = {
    /** 列表数据 */
    items: T[]
    /** 总条数 */
    total: number
    /** 当前页数 */
    page: number
    /** 每页条数 */
    pageSize: number
    /** 总共页数 */
    pageCount: number
}
// 分页请求类型
export type pageRequest = {
    /** 第几页 */
    page: number,
    /** 每页几条，default: 10 */
    pageSize:number,
    /** 用户id */
    openid:string,
    /** 补充 */
    supply:number
}

