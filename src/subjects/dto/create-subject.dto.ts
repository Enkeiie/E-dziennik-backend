import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";

export class CreateSubjectDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    public code: string;

    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    @IsMongoId()
    public teachers: string[];
}