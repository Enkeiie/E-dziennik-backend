import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'; import { Csrf } from "ncsrf";
import { ParentsChildrenService } from './parents-children.service';
import { CreateParentsChildDto } from './dto/create-parents-child.dto';
import { UpdateParentsChildDto } from './dto/update-parents-child.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Role } from 'src/users/enums/Role';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('parents-children')
export class ParentsChildrenController {
  constructor(private readonly parentsChildrenService: ParentsChildrenService) { }

  @ApiOperation({ summary: 'Dodawanie relacji rodzic-dziecko' })
  @ApiBody({ type: CreateParentsChildDto })
  @ApiResponse({ status: 200, description: 'Doda relację rodzic-dziecko.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createParentsChildDto: CreateParentsChildDto) {
    return this.parentsChildrenService.create(createParentsChildDto);
  }

  @ApiOperation({ summary: 'Wyświetl listę relacji rodzic-dziecko' })
  @ApiResponse({ status: 200, description: 'Zwróci listę relacji rodzic-dziecko.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.parentsChildrenService.findAll();
  }

  @ApiOperation({ summary: 'Wyświetl listę dzieci rodzica' })
  @ApiParam({ name: "id", description: "Identyfikator rodzica" })
  @ApiResponse({ status: 200, description: 'Zwróci listę dzieci rodzica.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get('/parent/:id')
  @Roles(Role.PARENT)
  findAllChildrens(@Param('id') id: string) {
    return this.parentsChildrenService.findChildren(id);
  }

  @ApiOperation({ summary: 'Wyświetl relację rodzic-dziecko' })
  @ApiParam({ name: "id", description: "Identyfikator relacji rodzic-dziecko" })
  @ApiResponse({ status: 200, description: 'Zwróci relację.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @Roles(Role.PARENT, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.parentsChildrenService.findOne(id);
  }

  @ApiOperation({ summary: 'Edycja relacji rodzic-dziecko' })
  @ApiParam({ name: "id", description: "Identyfikator relacji rodzic-dziecko" })
  @ApiBody({type: UpdateParentsChildDto })
  @ApiResponse({ status: 200, description: 'Zedytuje relację.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateParentsChildDto: UpdateParentsChildDto) {
    return this.parentsChildrenService.update(id, updateParentsChildDto);
  }

  @ApiOperation({ summary: 'Usuwanie relacji rodzic-dziecko' })
  @ApiParam({ name: "id", description: "Identyfikator relacji rodzic-dziecko" })
  @ApiResponse({ status: 200, description: 'Usunie relację.' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień.' })
  @UseGuards(AccessTokenGuard)
  @Csrf()
  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.parentsChildrenService.remove(id);
  }
}
