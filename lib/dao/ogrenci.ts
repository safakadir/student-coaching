import mongoClientConnection from '@/lib/mongodb';
import { Ogrenci, OgrenciEntity } from '../types/ogrenci';

export async function findAllStudents(): Promise<Ogrenci[]> {
    const client = await mongoClientConnection
    const collection = client.db(process.env.MONGODB_NAME).collection('students')
    const students = await collection.find<OgrenciEntity>({}).toArray()
    return students.map(s => {
        const student: Ogrenci = {...s, _id: s._id.toString(), registeredAt: s.registeredAt.valueOf()}
        return student
    })
}