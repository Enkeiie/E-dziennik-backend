import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from "src/users/entities/user.entity";

export type SubjectDocument = Subject & Document;

@Schema({
    timestamps:false,
})
export class Subject {
    @Prop({required:true})
    title: string;

    @Prop({required:true, unique:true})
    code: string;

    @Prop({required:false, default: [], type: [{type: Types.ObjectId, ref: User.name}]})
    teachers: User[];
}

export const SubjectSchema=SchemaFactory.createForClass(Subject);