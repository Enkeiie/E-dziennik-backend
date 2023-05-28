import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { ArrayMinSize, IsArray, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";

export class CreateClassDto {
    @ApiProperty({
        description: "Literał klasy",
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public code: string;

    @ApiProperty({
        description: "Kod numeryczny klasy (rok)",
        type: String,
    })
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
    @IsNotEmpty()
    @IsString()
    public year: string;

    @ApiProperty({
        description: "Lista uczniów (identyfikatory)",
        type: [String],
    })
    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    @IsMongoId()
    public students: string[];

    @ApiProperty({
        description: "Lista przedmiotów (identyfikatory)",
        type: [String],
    })
    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    @IsMongoId()
    public subjects: string[];
}
