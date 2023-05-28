import { PartialType } from '@nestjs/mapped-types';
import { CreateTestDto } from './create-test.dto';
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTestDto extends PartialType(CreateTestDto) {
    @ApiProperty({
        description: "Tytuł sprawdzianu",
        type: String,
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public title: string;

    @ApiProperty({
        description: "Lista pytań (identyfikatory)",
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    @IsMongoId()
    public questions: string[];

    @ApiProperty({
        description: "Identyfikator autora",
        type: String,
    })
    @IsOptional()
    @IsMongoId()
    public author: string;

    @ApiProperty({
        description: "próg zaliczeenia",
        type: Number,
    })
    @IsOptional()
    public pass: number;
}