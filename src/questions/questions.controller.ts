import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Role } from 'src/users/enums/Role';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';
import { ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @ApiOperation({ summary: 'Utwórz pytanie' })
  @ApiParam({ name: "id", description: "identyfikator sprawdzianu" })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({ status: 200, description: 'Doda pytanie do sprawdzianu.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post(':id')
  @Roles(Role.TEACHER)
  create(@Param('id') id: string, @Body() createTestDto: CreateQuestionDto) {
    return this.questionsService.addQuestion(id, createTestDto);
  }

  @ApiOperation({ summary: 'Edytuj pytanie' })
  @ApiParam({ name: "id", description: "identyfikator pytania" })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({ status: 200, description: 'Zedytuje pytanie.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id')
  @Roles(Role.TEACHER)
  update(@Param('id') id: string, @Body() editQuestionDto: UpdateQuestionDto) {
    return this.questionsService.editQuestion(id, editQuestionDto);
  }

  @ApiOperation({ summary: 'Usuń pytanie z sprawdzianu' })
  @ApiParam({ name: "id", description: "identyfikator sprawdzianu" })
  @ApiParam({ name: "id2", description: "identyfikator pytania" })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({ status: 200, description: 'Usunie pytanie z sprawdzianu.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id/:id2')
  @Roles(Role.TEACHER)
  remove(@Param('id') id: string, @Param('id2') id2: number) {
    return this.questionsService.removeQuestion(id, id2);
  }
}
