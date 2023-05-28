import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from "src/users/entities/user.entity";
import { value } from '../enums/value';

export type PresenceDocument = Presence & Document;

@Schema({
    timestamps:true,
})
export class Presence {
    @Prop({required: false, type: Array, enum: value, default: value.ABSENT})
    present: value;

    @Prop({required:false, default: null, type: mongoose.Schema.Types.ObjectId, ref: Subject.name})
    subject: string;

    @Prop({required:false, default: null, type: mongoose.Schema.Types.ObjectId, ref: User.name})
    student: User;

    @Prop({required:false, default: "", type: String})
    comment: string;
}

export const PresenceSchema=SchemaFactory.createForClass(Presence);