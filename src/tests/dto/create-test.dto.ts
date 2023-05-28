import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";

export class CreateTestDto {
    @ApiProperty({
        description: "Tytuł sprawdzianu",
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    public title: string;

    @ApiProperty({
        description: "Lista pytań (identyfikatory)",
        type: [String],
    })
    @IsArray()
    @ArrayMinSize(0)
    @ValidateNested()
    @IsMongoId()
    public questions: string[];

    @ApiProperty({
        description: "Identyfikator autora",
        type: String,
    })
    @IsMongoId()
    public author: string;

    @ApiProperty({
        description: "próg zaliczeenia",
        type: Number,
    })
    public pass: number;
}