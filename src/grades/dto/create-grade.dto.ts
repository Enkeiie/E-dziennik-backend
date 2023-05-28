import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateGradeDto {
    @ApiProperty({
        description: "Wartość oceny",
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(6)
    public value: number;

    @ApiProperty({
        description: "Identyfikator ucznia",
        type: String,
    })
    @IsString()
    @IsMongoId()
    public student: string;

    @ApiProperty({
        description: "Identyfikator przedmiotu",
        type: String,
    })
    @IsString()
    @IsMongoId()
    public subject: string;

    @ApiProperty({
        description: "Rodzaj oceny",
        type: String,
    })
    @IsString()
    @MaxLength(255)
    public type: string;

    @ApiProperty({
        description: "Komentarz",
        type: String,
    })
    @IsString()
    @MaxLength(255)
    public comment: string;
}