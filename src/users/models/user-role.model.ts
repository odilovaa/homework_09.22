import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Role } from "src/roles/models/role.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({ tableName: 'user-role', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles>{
    @ApiProperty({ example: '1', description: "UserRole's id"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({ example: '1', description: "User's id"})
    @ForeignKey(() => User)
    @Column({ 
        type: DataType.INTEGER
    })
    userId: number;


    @ApiProperty({ example: '2', description: "Role's id"})
    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER})
    roleId: number;
}