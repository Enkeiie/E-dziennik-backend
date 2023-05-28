import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/enums/Role';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @ApiOperation({ summary: 'Dodaj przedmiot' })
  @ApiBody({ type: CreateSubjectDto })
  @ApiResponse({ status: 200, description: 'Doda przedmiot.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @ApiOperation({ summary: 'Lista przedmiotów' })
  @ApiResponse({ status: 200, description: 'Zwróci listę przedmiotów.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.subjectsService.findAll();
  }

  @ApiOperation({ summary: 'Nazwy przedmiotów' })
  @ApiResponse({ status: 200, description: 'Zwróci listę nazw.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('getters/names')
  @Roles(Role.ADMIN, Role.TEACHER)
  getSubjectNames() {
    return this.subjectsService.getNames();
  }

  @ApiOperation({ summary: 'Nazwy przedmiotów dla nauczyciela' })
  @ApiParam({ name: "id", description: "identyfikator nauczyciela" })
  @ApiResponse({ status: 200, description: 'Zwróci listę nazw.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('getters/names/:id')
  @Roles(Role.ADMIN, Role.TEACHER)
  getTeacherSubjectNames(@Param('id') id: string) {
    return this.subjectsService.getTeacherSubjects(id);
  }

  @ApiOperation({ summary: 'Wyświetl przedmiot' })
  @ApiParam({ name: "id", description: "identyfikator przedmiotu" })
  @ApiResponse({ status: 200, description: 'Zwróć przedmiot.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id);
  }

  @ApiOperation({ summary: 'Edytuj przedmiot' })
  @ApiParam({ name: "id", description: "identyfikator przedmiotu" })
  @ApiBody({ type: UpdateSubjectDto })
  @ApiResponse({ status: 200, description: 'Zedytuje przedmiot.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @ApiOperation({ summary: 'Usuń przedmiot' })
  @ApiParam({ name: "id", description: "identyfikator przedmiotu" })
  @ApiResponse({ status: 200, description: 'Usunie przedmiot.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }

  @ApiOperation({ summary: 'Przypisz nauczyciela do przedmiotu' })
  @ApiParam({ name: "id", description: "identyfikator przedmiotu" })
  @ApiParam({ name: "id", description: "identyfikator nauczyciela" })
  @ApiResponse({ status: 200, description: 'Zwróć przedmiot.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post(':id/:id2')
  @Roles(Role.ADMIN)
  addTeacher(@Param('id') id: string, @Param('id2') id2: string) {
    return this.subjectsService.addTeacher(id, id2);
  }

  @ApiOperation({ summary: 'Wypisz nauczyciela z przedmiotu' })
  @ApiParam({ name: "id", description: "identyfikator przedmiotu" })
  @ApiParam({ name: "id", description: "identyfikator nauczyciela" })
  @ApiResponse({ status: 200, description: 'Zwróć przedmiot.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id/:id2')
  @Roles(Role.ADMIN)
  removeTeacher(@Param('id') id: string, @Param('id2') id2: number) {
    return this.subjectsService.removeTeacher(id, id2);
  }
}
