import { Parent } from "../schemas/parent.schema"
import { StudentTerm } from "../schemas/student-term.schema"

export class CreateStudentDto {
    readonly fullName: string
    readonly birthDate: Date
    readonly term: StudentTerm
    readonly contactPhone: string
    readonly parents: Parent[]
}
