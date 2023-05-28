import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAddressDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    public city: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    public postal: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    public street: string;

    @IsNumber()
    @IsNotEmpty()
    public house_number: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(12)
    @MaxLength(12)
    public PESEL: string;
    
    @IsNumber()
    @IsNotEmpty()
    public flat_number: number;

}