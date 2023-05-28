import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString, MaxLength, IsNumber, IsMongoId, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';

export class UpdateClassDto extends PartialType(CreateClassDto) {
    @ApiProperty({
        description: "Literał klasy",
        type: String,
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public code: string;

    @ApiProperty({
        description: "Kod numeryczny klasy (rok)",
        type: String,
    })
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    public number: number;

    @ApiProperty({
        description: "Identyfikator nauczyciela",
        type: String,
    })
    @IsOptional()
    @IsMongoId()
    public homeroomteacher: string;

    @ApiProperty({
        description: "Rocznik w formacie 'XXXX/XXXX' ",
        type: String,
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public year: string;

    @ApiProperty({
        description: "Lista uczniów (identyfikatory)",
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    @IsMongoId()
    public students: string[];

    @ApiProperty({
        description: "Lista przedmiotów (identyfikatory)",
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    @IsMongoId()
    public subjects: string[];
}
