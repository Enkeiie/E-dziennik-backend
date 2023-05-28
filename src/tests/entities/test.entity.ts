import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';

export type TestDocument = Test & Document;

@Schema({
    timestamps:true,
})
export class Test {
    @Prop({required:true})
    title: string;

    @Prop({required:false, default: null, type: [{type: Types.ObjectId, ref: Question.name}]})
    questions: Question[];

    @Prop({required: true, default: 30})
    pass: number;

    @Prop({required: true, type: Types.ObjectId, ref: User.name})
    author: User;
}

export const TestSchema=SchemaFactory.createForClass(Test);