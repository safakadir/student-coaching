import { addStudent, findStudents, removeStudent, searchStudents } from "@/lib/dao/ogrenci-dao";
import { Ogrenci } from "@/lib/types/ogrenci-types";
import { Pagination } from "@/lib/types/pagination-types";
import { NextApiRequest, NextApiResponse } from "next";

const HARD_LIMIT = 10

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const PAGE_LIMIT: number = parseNumber(process.env.PAGE_LIMIT) ?? HARD_LIMIT
    
    if (req.method == 'POST') {
        addStudent(req.body as Ogrenci)
        return res.status(200).end()
    }
    
    if (req.method == 'DELETE') {
        const _id = req.query["_id"]
        if(typeof _id !== 'string') return res.status(400).end()
        removeStudent(_id)
        return res.status(200).end()
    }

    let searchParam: string|undefined, limitParam: number, offsetParam: number;
    try {
        validateQueryTypes(req)
        searchParam = req.query.search as string|undefined
        limitParam = parseNumber(req.query.limit as string) ?? PAGE_LIMIT
        offsetParam = parseNumber(req.query.offset as string) ?? 0
    }
    catch (e) {
        throw new Error("Invalid query paramaters", {cause: e})
    }

    let result
    if(searchParam) {
        result = await searchStudents(searchParam, offsetParam, limitParam)
    }
    else {
        result = await findStudents(offsetParam, limitParam)
    }

    const response: Pagination<Ogrenci> = {
        offset: offsetParam,
        limit: limitParam,
        count: result.data.length,
        totalCount: result.totalCount,
        search: searchParam,
        page: offsetParam/limitParam+1,
        nextQuery: result.data.length == limitParam ? generateNextQuery(offsetParam, limitParam, searchParam) : undefined,
        prevQuery: offsetParam > 0 ? generatePrevQuery(offsetParam, limitParam, searchParam) : undefined,
        data: result.data
    }
    res.status(200).json(response)
}

function generateNextQuery(offset: number, limit: number, searchParam?: string): string {
    return (searchParam ? `&search=${searchParam}` : '') + `limit=${limit}&offset=${offset+limit}`
}

function generatePrevQuery(offset: number, limit: number, searchParam?: string): string {
    return (searchParam ? `&search=${searchParam}` : '') + `limit=${limit}&offset=${offset-limit}`
}

function validateQueryTypes(req: NextApiRequest): void {
    if(Array.isArray(req.query.search) ||
        Array.isArray(req.query.limit) ||
        Array.isArray(req.query.offset) ) {
            throw new Error("Multiple values for single query parameter is not expected")
    }
}

function parseNumber(str: string|undefined): number|undefined {
    if(!str) return
    const n = parseInt(str)
    if(isNaN(n)) throw new Error("Input is not parsable as number")
    return n
}
