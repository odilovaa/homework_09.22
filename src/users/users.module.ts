import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from 'src/roles/models/role.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from './models/user-role.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
