
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

export interface Ogrenci {
    _id: string
    fullname: string,
    registeredAt: number,
    birthDate: string,
    term: OgrenciDonem,
    contactPhone: string
}
