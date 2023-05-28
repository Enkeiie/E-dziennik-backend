import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { PresencesService } from './presences.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { User } from 'src/users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Role } from 'src/users/enums/Role';
import { ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('presences')
export class PresencesController {
  constructor(private readonly presencesService: PresencesService) { }

  @ApiOperation({ summary: 'Sprawdź obecność klasy z danego przedmiotu' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiParam({ name: "id2", description: "Identyfikator przedmiotu" })
  @ApiBody({ type: 'any' })
  @ApiResponse({ status: 200, description: 'Doda obecność klasy.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post(':id/:id2')
  @Roles(Role.TEACHER)
  create(@Body() body: any, @Param('id') grade: string, @Param('id2') subject: string) {
    console.log(typeof body.presentStudentsArray);
    return this.presencesService.createForClass(body.presentStudentsArray, grade, subject);
  }

  @ApiOperation({ summary: 'Wyświetl obecności' })
  @ApiResponse({ status: 200, description: 'Zwróci listę obecności.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get()
  @Roles(Role.TEACHER)
  findAll() {
    return this.presencesService.findAll();
  }

  @ApiOperation({ summary: 'Wyświetl obecności ucznia' })
  @ApiParam({ name: "id", description: "Identyfikator ucznia" })
  @ApiResponse({ status: 200, description: 'Zwróci listę obecności.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @Roles(Role.TEACHER, Role.PARENT)
  findOneStudent(@Param('id') id: string) {
    return this.presencesService.getStudentPresence(id);
  }

  @ApiOperation({ summary: 'Wyświetl listę obecności klasy z danego przedmiotu' })
  @ApiParam({ name: "id", description: "Identyfikator klasy" })
  @ApiParam({ name: "id2", description: "Identyfikator przedmiotu" })
  @ApiResponse({ status: 200, description: 'Zwróci listę obecności dla danej klasy z wybranego przedmiotu.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get(':id/:id2')
  @Roles(Role.TEACHER)
  findOne(@Param('id') id: string, @Param('id2') id2: string) {
    return this.presencesService.getClassPresence(id, id2);
  }

  @ApiOperation({ summary: 'Edycja obecności' })
  @ApiParam({ name: "id", description: "identyfikator obecności" })
  @ApiBody({ type: UpdatePresenceDto })
  @ApiResponse({ status: 200, description: 'Zedytuje obecność.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id')
  @Roles(Role.TEACHER, Role.PARENT)
  update(@Param('id') id: string, @Body() updatePresenceDto: UpdatePresenceDto) {
    return this.presencesService.update(id, updatePresenceDto);
  }

  @ApiOperation({ summary: 'Usuwanie obecności' })
  @ApiParam({ name: "id", description: "identyfikator obecności" })
  @ApiBody({ type: UpdatePresenceDto })
  @ApiResponse({ status: 200, description: 'Usunie obecności.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id')
  @Roles(Role.TEACHER)
  remove(@Param('id') id: string, @Body() dates: any) {
    return this.presencesService.remove(id, dates);
  }
}
