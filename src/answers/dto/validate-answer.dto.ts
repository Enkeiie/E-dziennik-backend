import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class ValidateAnswerDto {
    @ApiProperty({
        description: "Zawartość odpowiedzi",
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(1)
    public content: string;
}