import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/enums/Role';
import { ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) { }

  @ApiOperation({ summary: 'Dodaj sprawdzian' })
  @ApiBody({ type: CreateTestDto })
  @ApiResponse({ status: 200, description: 'Doda sprawdzian.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post()
  @Roles(Role.TEACHER)
  create(@Body() createTestDto: CreateTestDto) {
    return this.testsService.create(createTestDto);
  }

  @ApiOperation({ summary: 'Wyświetl wszystkie sprawdziany' })
  @ApiResponse({ status: 200, description: 'Zwróci listę sprawdzianów.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get()
  @Roles(Role.TEACHER)
  findAll() {
    return this.testsService.findAll();
  }

  @ApiOperation({ summary: 'Wyświetl sprawdzian' })
  @ApiParam({ name: 'id', description: 'Identyfikator sprawdzianu' })
  @ApiResponse({ status: 200, description: 'Zwróci sprawdzian.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @Roles(Role.TEACHER)
  findOne(@Param('id') id: string) {
    return this.testsService.findOne(id);
  }

  @ApiOperation({ summary: 'Wyświetl sprawdziany nauczyciela' })
  @ApiParam({ name: 'id', description: 'Identyfikator nauczyciela' })
  @ApiResponse({ status: 200, description: 'Zwróci listę sprawdzianów.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('teacher/:id')
  @Roles(Role.TEACHER)
  findTeacherTests(@Param('id') id: string) {
    return this.testsService.findOneTests(id);
  }

  @ApiOperation({ summary: 'Edytuj sprawdzian' })
  @ApiParam({ name: 'id', description: 'Identyfikator sprawdzianu' })
  @ApiBody({ type: UpdateTestDto })
  @ApiResponse({ status: 200, description: 'Zedytuje sprawdzian.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id')
  @Roles(Role.TEACHER)
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testsService.update(id, updateTestDto);
  }

  @ApiOperation({ summary: 'Usuń sprawdzian' })
  @ApiParam({ name: 'id', description: 'Identyfikator sprawdzianu' })
  @ApiResponse({ status: 200, description: 'Usunie sprawdzian.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id')
  @Roles(Role.TEACHER)
  remove(@Param('id') id: string) {
    return this.testsService.remove(id);
  }
}
