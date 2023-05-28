import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignedTestDto } from './create-assigned-test.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsMongoId, IsOptional } from 'class-validator';

export class UpdateAssignedTestDto extends PartialType(CreateAssignedTestDto) {
    @ApiProperty({
        description: "Identyfikator klasy",
        type: String,
    })
    @IsOptional()
    @IsString()
    @IsMongoId()
    public classId: string

    @ApiProperty({
        description: "Identyfikator sprawdzianu",
        type: String,
    })
    @IsOptional()
    @IsString()
    @IsMongoId()
    public testId: string

    @ApiProperty({
        description: "Identyfikator nauczyciela",
        type: String,
    })
    @IsOptional()
    @IsString()
    @IsMongoId()
    public teacherId: string

    @ApiProperty({
        description: "Data przypisania",
        type: () => Date,
    })
    @IsOptional()
    @Type(() => Date)
    public dateAssigned: Date

    @ApiProperty({
        description: "Data wygaśnięcia",
        type: () => Date,
    })
    @IsOptional()
    @Type(() => Date)
    public expirationDate: Date
}
