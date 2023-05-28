import { Module } from '@nestjs/common';import {Csrf} from "ncsrf";
import { MongooseModule } from '@nestjs/mongoose';
import { TestsModule } from 'src/tests/tests.module';
import { Question, QuestionSchema } from './entities/question.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: Question.name, schema: QuestionSchema}]), TestsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService]
})
export class QuestionsModule {}
