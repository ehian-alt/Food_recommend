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