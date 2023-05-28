import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Role } from 'src/users/enums/Role';
import { AnswersService } from './answers.service';
import { ValidateAnswerDto } from './dto/validate-answer.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) { }

  @ApiOperation({ summary: 'Dodaj odpowiedź' })
  @ApiParam({ name: "id", description: "Identyfikator pytania" })
  @ApiBody({ type: ValidateAnswerDto })
  @ApiResponse({ status: 200, description: 'Zwróci pytanie.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post(':id')
  @Roles(Role.TEACHER)
  create(@Param('id') id: string, @Body() createAnswerDto: ValidateAnswerDto) {
    return this.answersService.addAnswer(id, createAnswerDto);
  }

  @ApiOperation({ summary: 'Ustaw odpowiedź' })
  @ApiParam({ name: "id", description: "Identyfikator pytania" })
  @ApiBody({ type: ValidateAnswerDto })
  @ApiResponse({ status: 200, description: 'Zwróci pytanie.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id')
  @Roles(Role.TEACHER)
  update(@Param('id') id: string, @Body() editAnswerDto: ValidateAnswerDto) {
    console.log(editAnswerDto.content);
    return this.answersService.editAnswer(id, editAnswerDto);
  }

  @ApiOperation({ summary: 'Usuń odpowiedź' })
  @ApiParam({ name: "id", description: "Identyfikator pytania" })
  @ApiParam({ name: "id2", description: "Identyfikator odpowiedzi" })
  @ApiResponse({ status: 200, description: 'Usunie pytanie.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id/:id2')
  @Roles(Role.TEACHER)
  remove(@Param('id') id: string, @Param('id2') id2: number) {
    return this.answersService.deleteAnswer(id, id2);
  }
}
