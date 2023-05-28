import { PartialType } from '@nestjs/mapped-types';
import { CreateGradeDto } from './create-grade.dto';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGradeDto extends PartialType(CreateGradeDto) {
    @ApiProperty({
        description: "Wartość oceny",
        type: Number,
    })
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(6)
    public value: number;

    @ApiProperty({
        description: "Identyfikator ucznia",
        type: String,
    })
    @IsOptional()
    @IsString()
    @IsMongoId()
    public student: string;

    @ApiProperty({
        description: "Identyfikator przedmiotu",
        type: String,
    })
    @IsOptional()
    @IsString()
    @IsMongoId()
    public subject: string;

    @ApiProperty({
        description: "Rodzaj oceny",
        type: String,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    public type: string;

    @ApiProperty({
        description: "Komentarz",
        type: String,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    public comment: string;
}
