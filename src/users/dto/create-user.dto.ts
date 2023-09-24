import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user1', description: 'Username'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 'user1@mail.uz', description: "User's email"})
    @IsEmail()
    email: string;

    @ApiProperty({example: 'Uzbek1$t0n', description: "User's password"})
    @IsStrongPassword({minLength: 6})
    password: string;
}
