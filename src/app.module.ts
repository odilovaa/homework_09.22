import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles/models/role.model';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { UserRoles } from './users/models/user-role.model';
import { AuthModule } from './auth/auth.module';
import { RolesController } from './roles/roles.controller';
import { UsersController } from './users/users.controller';
import { RolesService } from './roles/roles.service';
import { UsersService } from './users/users.service';
@Module({
  imports: [

    ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true
      }),
      
      SequelizeModule.forRoot({
        dialect:"postgres",
        host:process.env.POSTGRES_HOST,
        port:+process.env.POSTGRES_PORT,
        username:process.env.POSTGRES_USER,
        password:String(process.env.POSTGRES_PASSWORD),
        database:process.env.POSTGRES_DB,
        models:[Role, User, UserRoles],
        autoLoadModels: true,
        logging: true,
      }),
  
      RolesModule,
      UserRoles,
      UsersModule,
      AuthModule,
  
  
    ],
  controllers: [RolesController, UsersController],
  providers: [RolesService, UsersService],
})
export class AppModule {}
