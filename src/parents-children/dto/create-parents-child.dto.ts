import { ApiProperty } from "@nestjs/swagger";
import { IsObjectId } from "class-validator-mongo-object-id";

export class CreateParentsChildDto {

    @ApiProperty({
        description: "Identyfikator ucznia",
        type: String,
    })
    @IsObjectId()
    public studentId: string

    @ApiProperty({
        description: "Identyfikator rodzica",
        type: String,
    })
    @IsObjectId()
    public parentId: string
}
