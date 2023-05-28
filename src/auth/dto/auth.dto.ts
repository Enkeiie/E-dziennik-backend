import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsString, IsNotEmpty } from "class-validator";

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Nazwa użytkownika",
    type: String,
  })
  public username: string;

  @IsString()
  @ApiProperty({
    description: "Hasło",
    type: String
  })
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    description: "Wynik uzupełnionej CAPTCHA",
    type: String
  })
  @IsNotEmpty()
  public captcha: string;
}
