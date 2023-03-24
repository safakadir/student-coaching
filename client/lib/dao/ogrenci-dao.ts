import { v4 as uuid } from 'uuid';

import firestore from '@/lib/firestore'
import { FirestoreDataConverter } from 'firebase-admin/firestore'
import { Ogrenci } from '../types/ogrenci-types';
import { PaginationBase } from '../types/pagination-types';

const studentsCollection = firestore.collection('students')

const converter: FirestoreDataConverter<Ogrenci> = {
    toFirestore: ({_id, ...keepAttr}: Ogrenci) => keepAttr,
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
        const student = snap.data() as Ogrenci
        student._id = snap.id
        return student
    }
}

export async function findStudents(offset: number, limit: number): Promise<PaginationBase<Ogrenci>> {
    const countResult = await studentsCollection.count().get()
    const queryResult = await studentsCollection.withConverter(converter)
        .orderBy('fullname')
        .offset(offset)
        .limit(limit)
        .get()

    const totalCount = countResult.data().count
    const students = queryResult.docs.map(d => d.data())

    return {data: students, totalCount}
}

export async function addStudent(student: Ogrenci) {
    const _id = uuid()

    await studentsCollection.withConverter(converter)
        .doc(_id)
        .set(student)
}

export async function searchStudents(search: string, offset: number, limit: number): Promise<PaginationBase<Ogrenci>> {
    const queryResult = await studentsCollection.withConverter(converter)
        .orderBy('fullname')
        .get()

    const searchTerms = search.toLowerCase().split(' ')
    const students = queryResult.docs
        .map(d => d.data())
        .filter(s => searchTerms.reduce(
            (preResult, term) => preResult && s.fullname.toLowerCase().includes(term), true)
        )

    return {data: students.slice(offset, offset+limit), totalCount: students.length}
}

export async function removeStudent(_id: string): Promise<boolean> {
    await studentsCollection.doc(_id).delete()
    return true
}
