import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUppercase } from "class-validator";


export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: "User's role"})
    @IsNotEmpty()
    @IsUppercase()
    @IsString()
    value: string;

    @ApiProperty({example: 'ADMIN', description: "Role's description"})
    @IsNotEmpty()
    @IsString()
    description: string;
    
}
