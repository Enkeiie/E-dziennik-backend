import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Class } from 'src/classes/entities/class.entity';
import { Subject } from "src/subjects/entities/subject.entity";
import { Test } from 'src/tests/entities/test.entity';
import { User } from 'src/users/entities/user.entity';

export type AssignedTestDocument = AssignedTest & Document;

@Schema({
    timestamps:false,
})
export class AssignedTest {

    @Prop({required:true, type: Types.ObjectId, ref: Class.name})
    classId: Class;

    @Prop({required:true, type: Types.ObjectId, ref: Test.name})
    testId: Test;

    @Prop({required:true, type: Types.ObjectId, ref: User.name})
    teacherId: User;
    
    @Prop({required:true, type: Types.ObjectId, ref: Subject.name})
    subjectId: Subject;

    @Prop({required:false, default: null, type: [{type: Types.ObjectId, ref: User.name}]})
    solvedIds: User[];

    @Prop({
        type: Date,
        required: true
    })
    dateAssigned: Date;

    @Prop({
        type: Date,
        required: true
    })
    expirationDate: Date;
}

export const AssignedTestSchema=SchemaFactory.createForClass(AssignedTest);