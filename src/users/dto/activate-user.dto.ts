import { ApiProperty } from "@nestjs/swagger";

export class ActivateUserDto{
    @ApiProperty({example: '1', description: "User's id"})
    readonly userId: number;
}