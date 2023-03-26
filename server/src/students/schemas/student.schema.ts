import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { Parent, ParentSchema } from "./parent.schema"
import { StudentTerm, StudentTermSchema } from "./student-term.schema"

export type StudentDocument = HydratedDocument<Student>

@Schema()
export class Student {
    @Prop({required: true})
    fullName: string

    @Prop({type: Date, immutable: true, default: Date.now})
    registeredAt?: Date

    @Prop()
    birthDate?: Date

    @Prop({type: StudentTermSchema, required: true})
    term: StudentTerm

    @Prop()
    contactPhone?: string
    
    @Prop([ParentSchema])
    parents?: Parent[]
}

export const StudentSchema = SchemaFactory.createForClass(Student)
