import { findStudents, searchStudents } from "@/lib/dao/ogrenci-dao";
import { OgrenciEntity } from "@/lib/types/ogrenci-types";
import { Pagination } from "@/lib/types/pagination-types";
import { NextApiRequest, NextApiResponse } from "next";

const HARD_LIMIT = 10

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let searchParam: string|undefined, limitParam: number, offsetParam: number;
    try {
        validateQueryTypes(req)
        searchParam = req.query.search as string|undefined
        limitParam = parseNumber(req.query.limit as string) ?? HARD_LIMIT
        offsetParam = parseNumber(req.query.offset as string) ?? 0
    }
    catch (e) {
        throw new Error("Invalid query paramaters", {cause: e})
    }

    let students: OgrenciEntity[]
    if(searchParam) {
        students = await searchStudents(searchParam, offsetParam, limitParam)
    }
    else {
        students = await findStudents(offsetParam, limitParam)
    }

    const result: Pagination<OgrenciEntity> = {
        offset: offsetParam,
        limit: limitParam,
        count: students.length,
        nextQuery: students.length == limitParam ? generateNextQuery(offsetParam, limitParam) : undefined,
        data: students
    }
    res.status(200).json(result)
}

function generateNextQuery(offset: number, limit: number): string {
    return `limit=${limit}&offset=${offset+limit}`
}

function validateQueryTypes(req: NextApiRequest): void {
    if(Array.isArray(req.query.search) ||
        Array.isArray(req.query.limit) ||
        Array.isArray(req.query.offset) ) {
            throw new Error("Multiple values for single query parameter is not expected")
    }
}

function parseNumber(str: string): number|undefined {
    if(!str) return
    const n = parseInt(str)
    if(isNaN(n)) throw new Error("Input is not parsable as number")
    return n
}