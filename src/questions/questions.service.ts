import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestsService } from 'src/tests/tests.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionDocument } from './entities/question.entity';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel(Question.name)private questionModel: Model<QuestionDocument>, private testService: TestsService){}

    /** Wyszukaj pytanie
     *  Wyszukuje pytanie po _id
     * @param id identyfikator pytania
     * @returns pytanie
     */
    async findOne(id: string) {
        return this.questionModel.findOne({_id: id});
    }

    /** Dodaj pytanie
     *  Dodaje nowe pytanie do testu o danym _id
     * @param id identyfiaktor testu
     * @param questionDto dane pytania
     * @returns dane testu
     */
    async addQuestion(id: string, questionDto: CreateQuestionDto) {
        const createdQuestion = new this.questionModel(questionDto);
        createdQuestion.save();
        const test = await this.testService.findOne(id);
        test.questions.push(createdQuestion);
        return test.save();
    }

    /** Edytuj pytanie
     *  Edytuje dane pytanie w teście o danym _id
     * @param id identyfikator testu
     * @param id2 identyfikator pytania
     * @param createQuestionDto dane do modyfikacji
     * @returns zmodyfikowany obiekt
     */
    async editQuestion(id: string, updateQuestionDto: UpdateQuestionDto) {
        return this.questionModel.findOneAndUpdate({_id: id},{ $set: {...updateQuestionDto}});
    }

    /** Zmień poprawną odpowiedź
     *  Zamienia poprawną odpowiedź
     * @param id identyfikator pytania
     * @param correct nowa wartość
     * @returns zmodyfikowany obiekt
     */
    async setCorrect(id: string, correct: string) {
        console.log(correct);
        return this.questionModel.findOneAndUpdate({_id: id},{ $set: { correct } },{ new: true },);
    }

    /** Usun pytanie
     *  Usuwa pytanie od danym id z testu o danym _id
     * @param id identyfikator testu
     * @param id2 identyfikator pytania
     * @returns tak/nie
     */
    async removeQuestion(id: string, id2: number) {
        const test = await this.testService.findOne(id);
        await this.questionModel.findOneAndDelete(test.questions[id2]);
        test.questions.splice(id2,1);
        return test.save();
    }
}
