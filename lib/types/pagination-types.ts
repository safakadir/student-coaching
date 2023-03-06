export interface PaginationBase<T> {
    totalCount: number,
    data: T[]
}

export interface Pagination<T> extends PaginationBase<T> {
    limit: number,
    offset: number,
    page: number,
    nextQuery?: string,
    prevQuery?: string
}
