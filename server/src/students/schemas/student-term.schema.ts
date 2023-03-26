import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Field, FIELDS } from "../enums/field.enum"
import { Grade, GRADES } from "../enums/grade.enum"

@Schema()
export class StudentTerm {
    @Prop({required: true})
    key: string

    @Prop()
    school: string

    @Prop({type: String, enum: GRADES, required: true})
    grade: Grade

    @Prop({type: String, enum: FIELDS, required: true})
    field: Field
}

export const StudentTermSchema = SchemaFactory.createForClass(StudentTerm)
