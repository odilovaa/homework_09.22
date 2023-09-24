import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/models/user.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'Registration of user'})
  @ApiResponse({status: 200, description: 'token of user | error', type: User})
  @Post('/registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @ApiOperation({summary: 'Log in of user'})
  @ApiResponse({status: 200, description: 'token of user | error', type: User})
  @HttpCode(200)
  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }
}
