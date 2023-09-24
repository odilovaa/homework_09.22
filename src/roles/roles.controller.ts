import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './models/role.model';
import { NUMBER } from 'sequelize';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({summary: 'Creating Role'})
  @ApiResponse({status: 200, description: 'Dates of created role', type: Role})
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }


  @ApiOperation({summary: 'Getting Roles'})
  @ApiResponse({status: 200, description: 'List of roles', type: [Role]})
  @Get()
  findAllRoles() {
    return this.rolesService.findAllRoles();
  }


  @ApiOperation({summary: 'Getting Role by value'})
  @ApiResponse({status: 200, description: 'Role', type: Role})
  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.rolesService.findByValue(value);
  }


  @ApiOperation({summary: 'Updating Role'})
  @ApiResponse({status: 200, description: 'Updated role', type: Role})
  @Put(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole(+id, updateRoleDto);
  }


  @ApiOperation({summary: 'Delating Role'})
  @ApiResponse({status: 200, description: 'if delated 1 if not 0', type: NUMBER})
  @Delete(':id')
  removeRole(@Param('id') id: string) {
    return this.rolesService.removeRole(+id);
  }
}
