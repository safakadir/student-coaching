import { FindOptions } from 'mongodb'
import mongoClientConnection from '@/lib/mongodb';
import { OgrenciEntity } from '../types/ogrenci-types';

const excludeOption: FindOptions<OgrenciEntity> = {projection: {oldTerms: 0, parents: 0}}

export async function findStudents(offset: number, limit: number): Promise<OgrenciEntity[]> {
    const client = await mongoClientConnection
    const collection = client.db(process.env.MONGODB_NAME).collection('students')
    const students = await collection.find<OgrenciEntity>({}, excludeOption).skip(offset).limit(limit).toArray()
    return students
}

export async function searchStudents(search: string, offset: number, limit: number): Promise<OgrenciEntity[]> {
    const client = await mongoClientConnection
    const collection = client.db(process.env.MONGODB_NAME).collection('students')
    const consditions = search.split(' ').map(name => ({fullname: {$regex: new RegExp(name, 'i')}}))
    const students = await collection.find<OgrenciEntity>({$and: consditions}, excludeOption).skip(offset).limit(limit).toArray()
    return students
}
