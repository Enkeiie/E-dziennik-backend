import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Role } from 'src/users/enums/Role';
import { AssignedTestsService } from './assigned-tests.service';
import { CreateAssignedTestDto } from './dto/create-assigned-test.dto';
import { UpdateAssignedTestDto } from './dto/update-assigned-test.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('assigned-tests')
export class AssignedTestsController {
  constructor(private readonly assignedTestsService: AssignedTestsService) { }

  @ApiOperation({ summary: 'Przypisz test' })
  @ApiBody({ type: CreateAssignedTestDto })
  @ApiResponse({ status: 200, description: 'Przypisze test.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post()
  create(@Body() createAssignedTestDto: CreateAssignedTestDto) {
    console.log(createAssignedTestDto);
    return this.assignedTestsService.create(createAssignedTestDto);
  }

  @ApiOperation({ summary: 'Zwróć aktywne sprawdziany przypisane przez danego nauczyciela' })
  @ApiParam({ name: "id", description: "Identyfikator nauczyciela" })
  @ApiResponse({ status: 200, description: 'Zwróci listę sprawdzianów.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('teacher/:id/active')
  @Roles(Role.TEACHER)
  findAllTeacherCTests(@Param('id') id: string) {
    return this.assignedTestsService.findAllTeacherAssignedCurrentTests(id);
  }

  @ApiOperation({ summary: 'Zwróć wygasłe sprawdziany przypisane przez danego nauczyciela' })
  @ApiParam({ name: "id", description: "Identyfikator nauczyciela" })
  @ApiResponse({ status: 200, description: 'Zwróci listę sprawdzianów.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('teacher/:id/expired')
  @Roles(Role.TEACHER)
  findAllTeacherETests(@Param('id') id: string) {
    return this.assignedTestsService.findAllTeacherAssignedExpiredTests(id);
  }

  @ApiOperation({ summary: 'Zwróć aktywne sprawdziany przypisane dla danego ucznia' })
  @ApiParam({ name: "id", description: "Identyfikator ucznia" })
  @ApiResponse({ status: 200, description: 'Zwróci listę sprawdzianów.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('student/:id')
  @Roles(Role.TEACHER)
  findAllStudentTests(@Param('id') id: string) {
    return this.assignedTestsService.findAllStudentTests(id);
  }

  @ApiOperation({ summary: 'Dodaj ucznia do listy osób, które rozwiązały sprawdzian' })
  @ApiParam({ name: "id", description: "Identyfikator sprawdzianu" })
  @ApiParam({ name: "id2", description: "Identyfikator ucznia" })
  @ApiResponse({ status: 200, description: 'Zwróci obiekt sprawdzianu.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('grade/:id/:id2')
  @Roles(Role.TEACHER)
  studentAddToList(@Param('id') id: string, @Param('id2') id2: string) {
    return this.assignedTestsService.addSolvedId(id, id2);
  }

  @ApiOperation({ summary: 'Edytuj pzypisanie sprawdzianu' })
  @ApiParam({ name: "id", description: "Identyfikator sprawdzianu" })
  @ApiBody({ type: UpdateAssignedTestDto })
  @ApiResponse({ status: 200, description: 'Zwróci obiekt sprawdzianu.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id')
  @Roles(Role.TEACHER)
  update(@Param('id') id: string, @Body() updateAssignedTestDto: UpdateAssignedTestDto) {
    return this.assignedTestsService.update(id, updateAssignedTestDto);
  }

  @ApiOperation({ summary: 'Usuń przypisanie sprawdzianu' })
  @ApiParam({ name: "id", description: "Identyfikator sprawdzianu" })
  @ApiResponse({ status: 200, description: 'Zwróci usunięty obiekt sprawdzianu.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id')
  @Roles(Role.TEACHER)
  remove(@Param('id') id: string) {
    return this.assignedTestsService.remove(id);
  }
}
