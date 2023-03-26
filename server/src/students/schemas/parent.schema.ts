import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Parent {
    @Prop()
    degree: string

    @Prop({required: true})
    contactPhone: string

    @Prop({required: true})
    fullName: string
}

export const ParentSchema = SchemaFactory.createForClass(Parent)
