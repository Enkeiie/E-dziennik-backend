import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, MinLength, IsOptional, ValidateNested, IsDefined, IsArray, MaxLength, maxLength} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    public username: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    public password: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    public first_name: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    public last_name: string;

    @IsOptional()
    public refresh_token: string;

    @IsString()
    @MinLength(11)
    @MaxLength(11)
    public PESEL: string;

    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    public address: CreateAddressDto;

    @IsOptional()
    public roles: string;
}
