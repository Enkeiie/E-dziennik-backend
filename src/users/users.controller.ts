import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../users/enums/Role';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Dodaj użytkownika' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'Doda użytkownika.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post()
  @Roles(Role.ADMIN, Role.TEACHER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Wyświetl listę użytkowników' })
  @ApiResponse({ status: 200, description: 'Zwróci listę użytkowników.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get()
  @Roles(Role.ADMIN, Role.TEACHER)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Wyświetli listę uczniów' })
  @ApiResponse({ status: 200, description: 'Zwróci listę użytkowników.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('getters/students')
  @Roles(Role.TEACHER, Role.ADMIN)
  findAllStudents() {
    return this.usersService.findAllStudents();
  }

  @ApiOperation({ summary: 'Wyświetli listę rodziców' })
  @ApiResponse({ status: 200, description: 'Zwróci listę użytkowników.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @Get('getters/parents')
  @Roles(Role.TEACHER, Role.ADMIN)
  findAllParents() {
    return this.usersService.findAllParents();
  }

  @ApiOperation({ summary: 'Wyświetli listę nauczycieli' })
  @ApiResponse({ status: 200, description: 'Zwróci listę użytkowników.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @Get('getters/teachers')
  @Roles(Role.TEACHER, Role.ADMIN)
  findAllTeachers() {
    return this.usersService.findAllTeachers();
  }

  @ApiOperation({ summary: 'Wyświetli użytkownika' })
  @ApiParam({ name: 'id', description: 'Identyfikator użytkownika' })
  @ApiResponse({ status: 200, description: 'Zwróci użytkownika.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @Get(':id')
  @Roles(Role.TEACHER, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Edytuj użytkownika' })
  @ApiParam({ name: 'id', description: 'Identyfikator użytkownika' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Zedytuje użytkownika.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id')
  @Roles(Role.ADMIN, Role.TEACHER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Usuń użytkownika' })
  @ApiParam({ name: 'id', description: 'Identyfikator użytkownika' })
  @ApiResponse({ status: 200, description: 'Usunie użytkownika.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id')
  @Roles(Role.ADMIN, Role.TEACHER)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'Dodaj adres do użytkownika' })
  @ApiParam({ name: 'id', description: 'Identyfikator użytkownika' })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 200, description: 'Doda adres i zwróci użytkownika.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post(':id/addAddress')
  addAddresses(@Param('id') id: string, @Body() createAddressDto: CreateAddressDto) {
    return this.usersService.addAddress(id, createAddressDto);
  }

  @ApiOperation({ summary: 'Edytuj adres użytkownika' })
  @ApiParam({ name: 'id', description: 'Identyfikator użytkownika' })
  @ApiParam({ name: 'id2', description: 'Identyfikator adresu' })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 200, description: 'Zedytuje adres i zwróci użytkownika.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id/:id2')
  updateAddresses(@Param('id') id: string, @Param('id2') id2: number, @Body() createAddressDto: CreateAddressDto) {
    return this.usersService.updateAddress(id, id2, createAddressDto);
  }

  @ApiOperation({ summary: 'Usuń adres użytkownika' })
  @ApiParam({ name: 'id', description: 'Identyfikator użytkownika' })
  @ApiParam({ name: 'id2', description: 'Identyfikator adresu' })
  @ApiResponse({ status: 200, description: 'Usunie adres i zwróci użytkownika.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id/:id2')
  removeAddress(@Param('id') id: string, @Param('id2') id2: number) {
    return this.usersService.removeAddress(id, id2);
  }
}
