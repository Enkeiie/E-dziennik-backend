import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsString } from "class-validator";


export class CreateAssignedTestDto {
    @ApiProperty({
        description: "Identyfikator klasy",
        type: String,
    })
    @IsString()
    @IsMongoId()
    public classId: string

    @ApiProperty({
        description: "Identyfikator sprawdzianu",
        type: String,
    })
    @IsString()
    @IsMongoId()
    public testId: string

    @ApiProperty({
        description: "Identyfikator nauczyciela",
        type: String,
    })
    @IsString()
    @IsMongoId()
    public teacherId: string

    @ApiProperty({
        description: "Data przypisania",
        type: () => Date,
    })
    @Type(() => Date)
    public dateAssigned: Date

    @ApiProperty({
        description: "Data wygaśnięcia",
        type:  () => Date,
    })
    @Type(() => Date)
    public expirationDate: Date
}
