export interface Pagination<T> {
    count: number,
    limit: number,
    offset: number,
    nextQuery?: string,
    data: T[]
}
