import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'; import { Csrf } from "ncsrf";
import { Request, response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RecaptchaService } from './recaptcha/recaptcha.service';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiQuery, ApiResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { value } from 'src/presences/enums/value';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, public recaptchaService: RecaptchaService) { }

  @ApiOperation({ summary: 'dodaj użytkownika' })
  @Csrf()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @ApiOperation({ summary: 'Zaloguj się' })
  @ApiCreatedResponse({ description: 'Zalogowano pomyślnie' })
  @ApiBadRequestResponse({ description: 'Błędne żądanie' })
  @ApiForbiddenResponse({ description: 'Brak dostępu' })
  @ApiResponse({
    status: 200,
    description: 'Zalogowano pomyślnie!',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          description: 'token JWT',
        },
        refreshToken: {
          type: 'string',
          description: 'refresh token',
        },
        userRole: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'identyfikator użytkownika',
            },
            role: {
              type: 'array',
              items: {
                type: 'string',
                description: 'rola użytkownika'
              },
            },
          },
        },
      },
    },
  })
  @Post('signin')
  async signin(@Body() data: AuthDto) {
    try {
      const isValidRecaptcha = await this.recaptchaService.validate(data.captcha);
      if (!isValidRecaptcha) {
        throw new Error("Błędna odpowiedź żądania reCAPTCHA");
      }
      const tokens = await this.authService.signIn(data);
      return tokens;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Wyloguj użytkownika' })
  @ApiQuery({ name: 'accessToken', required: true })
  @ApiResponse({ status: 200, description: 'Wylogowano pomyślnie.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @ApiOperation({ summary: 'Odśwież token JWT' })
  @ApiQuery({ name: 'refreshToken', required: true })
  @ApiResponse({ status: 200, description: 'Zwróci tokeny.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request) {
    const userID = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userID, refreshToken);
  }

  @ApiOperation({ summary: 'Wyświetl profil' })
  @ApiQuery({ name: 'accessToken', required: true })
  @ApiResponse({ status: 200, description: 'Zwróci profil użytkownika.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const userID = req.user['sub'];
    const user = await this.authService.getUserProfile(userID);
    return user;
  }

  @ApiOperation({ summary: 'Edytuj dane profilu' })
  @ApiQuery({ name: 'accessToken', required: true })
  @ApiResponse({ status: 200, description: 'Zwróci nowe dane.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post('profile')
  async editProfile(@Req() req: Request, @Body() data: UpdateUserDto) {
    const userID = req.user['sub'];
    return this.authService.updateUserProfile(userID, data);
  }
}
