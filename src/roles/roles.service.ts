import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role){}



  async createRole(createRoleDto: CreateRoleDto) {
    const newRole = await this.roleRepo.create(createRoleDto);
    return newRole;
  }

  async findAllRoles() {
    const roles = await this.roleRepo.findAll({include: {all: true}});
    return roles;
  }

  async findByValue(value: string) {
    const role = await this.roleRepo.findOne({where: {value}});
    return role;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepo.update(updateRoleDto, {where: {id}, returning: true});
    return role[1][0];
  }

  async removeRole(id: number) {
    const role = await this.roleRepo.destroy({where: {id}})
    return role;
  }
}
