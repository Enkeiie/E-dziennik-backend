import { Prop, SchemaFactory , Schema} from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Subject, SubjectDocument } from "src/subjects/entities/subject.entity";
import { User, UserDocument } from "src/users/entities/user.entity";

export type GradeDocument = Grade & Document;

@Schema({
    timestamps:true,
})
export class Grade {
    @Prop({required:true})
    value: string;

    @Prop({required:false, type: mongoose.Schema.Types.ObjectId, ref: User.name})
    student: User;

    @Prop({required:false, type: mongoose.Schema.Types.ObjectId, ref: Subject.name})
    subject: Subject;

    @Prop({required:true, default: 'aktywność'})
    type: string;

    @Prop({required:false, default: ''})
    comment: string;
}

export const GradeSchema=SchemaFactory.createForClass(Grade);