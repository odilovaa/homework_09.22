import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginDto {
    @ApiProperty({example: 'user1@mail.uz', description: "User's email"})
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: 'Uzbek1$t0n', description: "User's password"})
    @IsStrongPassword()
    readonly password: string;
}
