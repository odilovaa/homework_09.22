import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private readonly rolesService: RolesService,
  ){}
  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    const role = await this.rolesService.findByValue('ADMIN');

    if(!role) {
      throw new BadRequestException('Role not found');
    }

    await newUser.$set('roles', [role.id]);
    await newUser.save();
    newUser.roles = [role];

    return newUser;
  }

  async findAllUsers() {
    const users = await this.userRepo.findAll({include: {all: true}});
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      include: {all: true},
    });
    return user;
  }

  async findOneUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      include: {all: true},
    });
    return user;
  }

  async removeUser(id: number) {
    const user = await this.userRepo.destroy({where: {id}});
    if(!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {message: 'User delated'};
  }

  async addRole(addRoleDto: AddRoleDto){
    const user = await this.userRepo.findByPk(addRoleDto.userId);
    const role = await this.rolesService.findByValue(addRoleDto.value);

    if(role && user) {
      await user.$add('roles', role.id);
      const updateUser = await this.userRepo.findByPk(
        addRoleDto.userId,
        {
          include: {all: true},
        },
      );
      return updateUser
    }
    throw new HttpException(
      'User or Role is not found',
      HttpStatus.NOT_FOUND,
    )
  }

  
  async removeRole(addRoleDto: AddRoleDto){
    const user = await this.userRepo.findByPk(addRoleDto.userId);
    const role = await this.rolesService.findByValue(addRoleDto.value);

    if(role && user) {
      await user.$remove('roles', role.id);
      const updateUser = await this.userRepo.findByPk(
        addRoleDto.userId,
        {
          include: {all: true},
        },
      );
      return updateUser
    }
    throw new HttpException(
      'User or Role is not found',
      HttpStatus.NOT_FOUND,
    )
  }

  async activateUser(activateUserDto: ActivateUserDto){
    const user = await this.userRepo.findByPk(activateUserDto.userId)
    if(!user){
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    user.is_activea = true;
    await user.save();
    return user;
  }
}
