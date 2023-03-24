import axios from "@/lib/axios"
import { Pagination } from "@/lib/types/pagination-types"
import { useCallback, useEffect, useState } from "react"

interface UsePaginationApiResult<T> {
    pageResult?: Pagination<T>,
    loading: boolean,
    error?: Error,
    gotoPage: (page: number) => void,
    search: (searchParam: string) => void,
    reset: () => void,
    reload: () => void
}

async function fetchData<T>(path: string, query?: string): Promise<Pagination<T>> {
    const url = process.env.BASE_API_URL + path + (query ? '?'+query : '')
    const response = await fetch(url)
    return await response.json()
}

export const usePaginationApi = <T>(path: string): UsePaginationApiResult<T> => {
    const [pageResult, setPageResult] = useState<Pagination<T>>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const [page, setPage] = useState<number>(1)
    const [searchParam, setSearchParam] = useState<string|undefined>(undefined)

    const loadData = useCallback(() => {
        setLoading(true)

        let query: string|undefined
        if(!!pageResult) {
            const params = []
            if(searchParam) params.push('search='+searchParam)
            params.push('limit='+pageResult.limit)
            params.push('offset='+(page-1)*pageResult.limit)
            query = params.join('&')
        }

        axios.get<Pagination<T>>(path + (query ? '?'+query : ''))
        .then(response => {
            setError(undefined)
            setPageResult(response.data)
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [page, searchParam])

    useEffect(() => {
        loadData()
    }, [page, searchParam])

    const gotoPage = useCallback((pageGiven: number) => {
        setPage(pageGiven)
    }, [])

    const search = useCallback((searchParam: string) => {
        setSearchParam(searchParam)
    }, [])

    const reset = useCallback(() => {
        setSearchParam(undefined)
    }, [])

    return { pageResult, loading, error, gotoPage, search, reset, reload: loadData}
}
