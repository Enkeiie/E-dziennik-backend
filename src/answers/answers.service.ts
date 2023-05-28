import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionsService } from 'src/questions/questions.service';
import { ValidateAnswerDto } from './dto/validate-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
    constructor( private questionsService: QuestionsService ){}

    /** Dodaj odpowiedź
     *  Dodaje odpowiedź do pytania o danym indeksie w teście o danym _id
     * @param id identyfikator testu
     * @param id2 index pytania
     * @param createAnswerDto dane pytania
     * @returns zmodyfikowany obiekt testu
     */
    async addAnswer(id: string, createAnswerDto: ValidateAnswerDto) {
        console.log(id);
        const question = await this.questionsService.findOne(id);
        const answer = new Answer(createAnswerDto);
        question.answers.push(answer);
        return question.save();
    }

    /** Ustaw odpowiedź jako poprawną
     *  Ustawia odpowiedź jako prawidłową
     * @param id2 identyfikator pytania
     * @param createAnswerDto zmodyfikowane dane pytania
     * @returns zmodyfikowany obiekt pytania
     */
    async editAnswer(id: string, updateAnswerDto: ValidateAnswerDto) {
        return await this.questionsService.setCorrect(id,updateAnswerDto.content);
    }

    /** Usuń odpowiedź
     *  Usuwa odpowiedź z pytania o danym indeksie w teście o danym _id
     * @param id identyfikator testu
     * @param id2 identyfikator pytania
     * @param id3 identyfikator odpowiedzi
     * @returns tak/nie
     */
    async deleteAnswer(id: string, id2: number) {
        const question = await this.questionsService.findOne(id);
        question.answers.splice(id2,1);
        return question.save();
    }

}
