import { Module } from '@nestjs/common';import {Csrf} from "ncsrf";
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [QuestionsModule],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService]
})
export class AnswersModule {}
