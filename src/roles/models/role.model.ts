import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRoles } from "src/users/models/user-role.model";
import { User } from "src/users/models/user.model";


interface RoleCreationAttr{
    value: string;
    description: string;
}

@Table({ tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttr>{
    @ApiProperty({example: '1', description: "Role's id"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({example: 'ADMIN', description: "User's role"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    value: string;


    @ApiProperty({example: 'ADMIN', description: "Role's description"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @ApiProperty({example: ['Users'], description: "Role's users"})
    @BelongsToMany(() => User, () => UserRoles)
    roles: User[];
}
