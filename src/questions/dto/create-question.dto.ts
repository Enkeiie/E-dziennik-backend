import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";

export class CreateQuestionDto{
   
    @ApiProperty({
        description: "Tytuł pytania",
        type: String,
    })
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