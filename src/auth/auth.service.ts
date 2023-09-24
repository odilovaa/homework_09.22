import {  HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/models/user.model';
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ){}
  async registration(userDto: CreateUserDto) {
    const condidate = await this.usersService.findByEmail(userDto.email);
    if(condidate) {
      throw new HttpException(
        'User already exits',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User){
    const payload = { email: user.email, id: user.id, roles: user.roles};
    return { token: this.jwtService.sign(payload)};
  }

  async login(loginDto: LoginDto){
    const user = await this.validateUser(loginDto);
    if(!user){
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    return this.generateToken(user);
  }

  private async validateUser(loginDto: LoginDto){
    const user = await this.usersService.findByEmail(loginDto.email);
    if(!user){
      throw new UnauthorizedException('Email or Password invalid');
    }
    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (validPassword){
      return user;
    }
    throw new UnauthorizedException('Email or Password invalid')
  }
}
