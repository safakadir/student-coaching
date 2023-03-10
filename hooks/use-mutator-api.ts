import axios from "@/lib/axios"
import { DeepPartial, Identable } from "@/lib/types/common"
import { useCallback, useState } from "react"

interface UseMutatorApiResult<T extends Identable> {
    create: (entity: DeepPartial<T>) => void,
    update: (entity: DeepPartial<T>, _id: string) => void,
    remove: (_id: string) => void,
    loading: boolean,
    error?: Error,
    _idCreated?: string
}

export const useMutatorApi = <T extends Identable>(path: string) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const [_idCreated, setIdCreated] = useState<string>()
    
    const create = useCallback((entity: DeepPartial<T>) => {
        setLoading(true)
        axios.post<T>(path, entity)
        .then(response => {
            setError(undefined)
            setIdCreated(response.data._id)
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [path])
        
    const update = useCallback((entity: DeepPartial<T>, _id: string) => {
        setLoading(true)
        axios.put(path+'/'+_id, entity)
        .then(response => {
            setError(undefined)
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [path])
        
    const remove = useCallback((_id: string) => {
        setLoading(true)
        axios.delete(path+'/'+_id)
        .then(response => {
            setError(undefined)
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [path])

    return {loading, error, create, update, remove, _idCreated}
}
