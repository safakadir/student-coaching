import { ObjectId } from 'mongodb'

export interface OgrenciDonem {
    key: string,
    school: string,
    grade: string,
    field: string
}

export interface Veli {
    name: string,
    contactPhone: string,
    degree: string
}

export interface OgrenciBase {
    fullname: string,
    registeredAt: number,
    birthDate: string,
    term: OgrenciDonem,
    contactPhone: string
}

export interface Ogrenci extends OgrenciBase {
    _id: string
}

export interface OgrenciEntity extends OgrenciBase {
    _id: ObjectId,
    oldTerms: OgrenciDonem[],
    parents: Veli[],
}
