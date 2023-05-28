import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Role } from 'src/users/enums/Role';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @ApiOperation({ summary: 'Utwórz klasę' })
  @ApiBody({ type: CreateClassDto })
  @ApiResponse({ status: 200, description: 'Doda klasę.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @ApiOperation({ summary: 'Lista klas' })
  @ApiResponse({ status: 200, description: 'Zwróci listę klas.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.classesService.findAll();
  }

  @ApiOperation({ summary: 'Wyświetl klasę' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiResponse({ status: 200, description: 'Wyświetli klasę.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @Roles(Role.ADMIN, Role.TEACHER)
  findOne(@Param('id') id: string,) {
    return this.classesService.findOne(id);
  }

  @ApiOperation({ summary: 'Nazwy klas' })
  @ApiParam({ name: "id", description: "Identyfikator nauczyciela" })
  @ApiResponse({ status: 200, description: 'Wyświetli listę nazw klas dla nauczycciela.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('getters/names/:id')
  @Roles(Role.ADMIN, Role.TEACHER)
  getClassesNames(@Param('id') id: string) {
    return this.classesService.getNames(id);
  }

  @ApiOperation({ summary: 'Edycja klasy' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiBody({ type: UpdateClassDto })
  @ApiResponse({ status: 200, description: 'Zwróci zedytowany obiekt.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto);
  }

  @ApiOperation({ summary: 'Usuwanie klasy' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiResponse({ status: 200, description: 'Usunię klasę.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }

  @ApiOperation({ summary: 'Dodawanie ucznia do klasy' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiParam({ name: "id2", description: "Identyfikator ucznia" })
  @ApiResponse({ status: 200, description: 'Doda ucznia do klasy.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post(':id/students/:id2')
  @Roles(Role.ADMIN)
  addStudent(@Param('id') id: string, @Param('id2') id2: string) {
    return this.classesService.addStudent(id, id2);
  }

  @ApiOperation({ summary: 'Lista uczniów w klasie' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiResponse({ status: 200, description: 'Zwróci liste uczniów dla klasy.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get(':id/students')
  @Roles(Role.ADMIN, Role.TEACHER)
  getStudentNames(@Param('id') id: string) {
    return this.classesService.getStudentsNames(id);
  }

  @ApiOperation({ summary: 'Wyświetl klasę ucznia' })
  @ApiParam({ name: "id", description: "Identyfikator ucznia" })
  @ApiResponse({ status: 200, description: 'Zwróci klasę.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @Get('student/:id')
  getStudentClass(@Param('id') id: string) {
    return this.classesService.getStudentClass(id);
  }

  @ApiOperation({ summary: 'Wyświetl wychowywane klasy' })
  @ApiParam({ name: "id", description: "Identyfikator nauczyciela" })
  @ApiResponse({ status: 200, description: 'Zwróci listę klas.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('teacher/:id')
  @Roles(Role.ADMIN, Role.TEACHER)
  getHomeroomClass(@Param('id') id: string) {
    return this.classesService.getTeacherClass(id);
  }

  @ApiOperation({ summary: 'Uzuwanie ucznia z klasy' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiParam({ name: "id2", description: "Identyfikator ucznia" })
  @ApiResponse({ status: 200, description: 'Usunie ucznia z klasy.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id/students/:id2')
  @Roles(Role.ADMIN)
  deleteStudent(@Param('id') id: string, @Param('id2') id2: number) {
    return this.classesService.removeStudent(id, id2);
  }

  @ApiOperation({ summary: 'Dodawanie przedmiotu do klasy' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiParam({ name: "id2", description: "Identyfikator przedmiotu" })
  @ApiResponse({ status: 200, description: 'Doda przedmiot do klasy.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post(':id/subjects/:id2')
  @Roles(Role.ADMIN)
  addSubject(@Param('id') id: string, @Param('id2') id2: string) {
    return this.classesService.addSubject(id, id2);
  }

  @ApiOperation({ summary: 'Usuń przedmiot z danej klasy' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiParam({ name: "id2", description: "Identyfikator przedmiotu" })
  @ApiResponse({ status: 200, description: 'Usunie przedmiot z klasy.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id/subjects/:id2')
  @Roles(Role.ADMIN)
  deleteSubject(@Param('id') id: string, @Param('id2') id2: number) {
    return this.classesService.removeSubject(id, id2);
  }
}
