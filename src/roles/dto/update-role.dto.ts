import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUppercase } from "class-validator";


export class UpdateRoleDto {
    @ApiProperty({example: 'ADMIN', description: "User's role it is optional"})
    @IsNotEmpty()
    @IsUppercase()
    @IsString()
    value?: string;

    @ApiProperty({example: 'ADMIN', description: "role's description  it is optional"})
    @IsNotEmpty()
    @IsString()
    description?: string;
    
}
