import { ValidateAnswerDto } from "../dto/validate-answer.dto";

export class Answer {

    constructor(validatedData: ValidateAnswerDto){
        this.content = validatedData.content;
    }

    content: string;
}