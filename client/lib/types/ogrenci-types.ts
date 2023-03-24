import { Identable } from "./common"

export interface OgrenciDonem {
    key: string,
    school: string,
    grade: Grade,
    field: string
}

export interface Veli {
    name: string,
    contactPhone: string,
    degree: string
}

export interface Ogrenci extends Identable {
    fullname: string,
    registeredAt: number,
    birthDate: string,
    term: OgrenciDonem,
    contactPhone: string
}

export const GRADE_VALUES = ["7.SINIF","8.SINIF","9.SINIF","10.SINIF","11.SINIF","12.SINIF","MEZUN"] as const
export const GRADES = Object.values(GRADE_VALUES)
export type Grade = typeof GRADE_VALUES[number]

export const FIELD_VALUES = ["SAY", "EA", "SOZ"] as const
export const FIELDS = Object.values(FIELD_VALUES)
export type Field = typeof FIELD_VALUES[number]
