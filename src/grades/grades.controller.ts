import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/enums/Role';
import { UseGuards } from '@nestjs/common/decorators';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) { }

  @ApiOperation({ summary: 'Dodaj ocenę' })
  @ApiBody({ type: CreateGradeDto })
  @ApiResponse({ status: 200, description: 'Doda ocenę.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post()
  @Roles(Role.TEACHER)
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @ApiOperation({ summary: 'Oceń sprawdzian' })
  @ApiBody({ type: CreateGradeDto })
  @ApiResponse({ status: 200, description: 'Doda ocenę.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post('test/grade')
  @Roles(Role.STUDENT, Role.TEACHER)
  gradeTest(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.gradeTest(createGradeDto);
  }

  @ApiOperation({ summary: 'Lista ocen' })
  @ApiResponse({ status: 200, description: 'Zwróci listę ocen.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get()
  @Roles(Role.TEACHER)
  findAll() {
    return this.gradesService.findAll();
  }

  @ApiOperation({ summary: 'Wyświetl oceny ucznia' })
  @ApiParam({ name: "id", description: "Identyfikator ucznia" })
  @ApiResponse({ status: 200, description: 'Zwróci listę ocen.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('student/:id')
  @Roles(Role.STUDENT, Role.PARENT, Role.TEACHER)
  getStudentGrades(@Param('id') id: string) {
    return this.gradesService.getStudentGrades(id);
  }

  @ApiOperation({ summary: 'Wyświetl listę ocen dla klasy z wybranego przedmiotu' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiParam({ name: "id2", description: "Identyfikator przedmiot" })
  @ApiResponse({ status: 200, description: 'Zwróci listę ocen dla klasy z danego przemdiotu.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get(':id/:id2')
  @Roles(Role.TEACHER)
  findOne(@Param('id') id: string, @Param('id2') id2: string) {
    return this.gradesService.getClassGrades(id, id2);
  }

  @ApiOperation({ summary: 'Edycja oceny' })
  @ApiParam({ name: "id", description: "Identyfikator oceny" })
  @ApiBody({ type: UpdateGradeDto })
  @ApiResponse({ status: 200, description: 'Edytuje ocenę.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id')
  @Roles(Role.TEACHER)
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(id, updateGradeDto);
  }

  @ApiOperation({ summary: 'Usuwanie oceny' })
  @ApiParam({ name: "id", description: "Identyfikator oceny" })
  @ApiResponse({ status: 200, description: 'Usunie ocenę.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id')
  @Roles(Role.TEACHER)
  remove(@Param('id') id: string) {
    return this.gradesService.remove(id);
  }
}
