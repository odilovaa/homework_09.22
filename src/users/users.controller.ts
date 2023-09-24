import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NUMBER } from 'sequelize';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Creating user'})
  @ApiResponse({status: 200, description: 'Dates of created user', type: User})
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) :Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({summary: 'Getting all users'})
  @ApiResponse({status: 200, description: 'List of users', type: [User]})
  @Get()
  findAllUsers() :Promise<User[]>{
    return this.usersService.findAllUsers();
  }

  @ApiOperation({summary: 'Getting one users by its id'})
  @ApiResponse({status: 200, description: 'User', type: User})
  @Get(':id')
  findOneUser(@Param('id') id: string) :Promise<User>{
    return this.usersService.findOneUser(+id);
  }

  @ApiOperation({summary: 'Delating one user by its id'})
  @ApiResponse({status: 200, description: 'If user delated 1 if not 0', type: NUMBER})
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }

  @ApiOperation({summary: 'Adding role to user'})
  @HttpCode(200)
  @Post('add_role')
  addRole(@Body() addRoleDto: AddRoleDto){
    return this.usersService.addRole(addRoleDto);
  }


  @ApiOperation({summary: 'Delating one role from user'})
  @HttpCode(200)
  @Post('remove_role')
  removeRole(@Body() addRoleDto: AddRoleDto){
    return this.usersService.removeRole(addRoleDto);
  }


  @ApiOperation({summary: 'Activating user'})
  @HttpCode(200)
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto){
    return this.usersService.activateUser(activateUserDto)
  }
}
