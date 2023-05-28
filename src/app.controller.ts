import { Controller, Get, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Pobierz token csrf' })
  @ApiResponse({ status: 200, description: 'Zwróci token.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @Get('csrf')
  getCsrfToken(@Req() req): Request {
    return req.csrfToken()
  }
}
