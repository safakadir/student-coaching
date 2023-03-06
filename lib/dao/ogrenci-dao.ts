import { FindOptions } from 'mongodb'
import mongoClientConnection from '@/lib/mongodb';
import { OgrenciEntity } from '../types/ogrenci-types';
import { PaginationBase } from '../types/pagination-types';

const excludeOption: FindOptions<OgrenciEntity> = {projection: {oldTerms: 0, parents: 0}}

export async function findStudents(offset: number, limit: number): Promise<PaginationBase<OgrenciEntity>> {
    const client = await mongoClientConnection
    const collection = client.db(process.env.MONGODB_NAME).collection('students')

    const totalCount = await collection.countDocuments({})
    const students = await collection.find<OgrenciEntity>({}, excludeOption).skip(offset).limit(limit).toArray()

    return {data: students, totalCount}
}

export async function searchStudents(search: string, offset: number, limit: number): Promise<PaginationBase<OgrenciEntity>> {
    const client = await mongoClientConnection
    const collection = client.db(process.env.MONGODB_NAME).collection('students')

    const conditions = search.split(' ').map(name => ({fullname: {$regex: new RegExp(name, 'i')}}))
    const filter = {$and: conditions}

    const totalCount = await collection.countDocuments(filter)
    const students = await collection.find<OgrenciEntity>(filter, excludeOption).skip(offset).limit(limit).toArray()
    
    return {data: students, totalCount}
}
