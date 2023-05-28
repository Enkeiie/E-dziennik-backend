import { PartialType } from '@nestjs/mapped-types';
import { CreateParentsChildDto } from './create-parents-child.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class UpdateParentsChildDto extends PartialType(CreateParentsChildDto) {
    @ApiProperty({
        description: "Identyfikator ucznia",
        type: String,
    })
    @IsOptional()
    @IsObjectId()
    public studentId: string

    @ApiProperty({
        description: "Identyfikator rodzica",
        type: String,
    })
    @IsOptional()
    @IsObjectId()
    public parentId: string
}
