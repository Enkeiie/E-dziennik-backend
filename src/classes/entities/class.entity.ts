import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { type } from "os";
import { Subject } from "src/subjects/entities/subject.entity";
import { User } from "src/users/entities/user.entity";

export type ClassDocument = Class & Document;

@Schema({
    timestamps:false,
})
export class Class {
    
    @Prop({required:true})
    number: number;

    @Prop({required:true})
    code: string;

    @Prop({required:true})
    year: string;

    @Prop({required:false, default: null, type: Types.ObjectId, ref: User.name})
    homeroomteacher: User;

    @Prop({required:false, default: null, type: [{type: Types.ObjectId, ref: User.name}]})
    students: User[];

    @Prop({required:false, default: null, type: [{type: Types.ObjectId, ref: Subject.name}]})
    subjects: Subject[];
}

export const ClassSchema=SchemaFactory.createForClass(Class);