import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: '1', description: "User's id"})
    readonly userId: number;
    @ApiProperty({example: 'SUPERADMIN', description: "Role's value"})
    readonly value: string;
}