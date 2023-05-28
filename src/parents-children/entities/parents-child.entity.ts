import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Class } from 'src/classes/entities/class.entity';
import { Subject } from "src/subjects/entities/subject.entity";
import { Test } from 'src/tests/entities/test.entity';
import { User } from 'src/users/entities/user.entity';

export type ParentsChildDocument = ParentsChild & Document;

@Schema({
    timestamps:false,
})
export class ParentsChild {
    
    @Prop({required:true, type: Types.ObjectId, ref: User.name})
    studentId: User;

    @Prop({required:true, type: Types.ObjectId, ref: User.name})
    parentId: User;
    
}

export const ParentsChildSchema=SchemaFactory.createForClass(ParentsChild);