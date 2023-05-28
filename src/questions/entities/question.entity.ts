import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Answer } from 'src/answers/entities/answer.entity';

export type QuestionDocument = Question & Document;

@Schema({
    timestamps:false,
})
export class Question {
    @Prop({required:true})
    header: string;

    @Prop({required: false, default: null})
    correct: string;

    @Prop({required:false, default: null})
    answers: Answer[];
}

export const QuestionSchema=SchemaFactory.createForClass(Question);