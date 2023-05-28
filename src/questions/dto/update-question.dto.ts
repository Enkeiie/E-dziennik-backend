import { PartialType } from "@nestjs/mapped-types";
import { CreateQuestionDto } from "./create-question.dto";
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
    @ApiProperty({
        description: "Tytuł pytania",
        type: String,
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    public header: string;

    @ApiProperty({
        description: "Poprawna odpowiedź",
        type: String,
    })
    @IsOptional()
    @IsString()
    public correct: string;

    @ApiProperty({
        description: "Odpowiedzi (identyfikatory)",
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    @IsMongoId()
    public answers: string[];
}