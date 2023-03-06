import mongoClientConnection from '@/lib/mongodb';
import { OgrenciEntity } from '../types/ogrenci-types';

export async function findStudents(offset: number, limit: number): Promise<OgrenciEntity[]> {
    const client = await mongoClientConnection
    const collection = client.db(process.env.MONGODB_NAME).collection('students')
    const students = await collection.find<OgrenciEntity>({}).skip(offset).limit(limit).toArray()
    return students
}

export async function searchStudents(search: string, offset: number, limit: number): Promise<OgrenciEntity[]> {
    const client = await mongoClientConnection
    const collection = client.db(process.env.MONGODB_NAME).collection('students')
    const consditions = search.split(' ').map(name => ({fullname: {$regex: new RegExp(name, 'i')}}))
    const students = await collection.find<OgrenciEntity>({$and: consditions}).skip(offset).limit(limit).toArray()
    return students
}
