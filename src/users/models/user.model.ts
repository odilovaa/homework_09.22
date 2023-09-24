import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/models/role.model";
import { UserRoles } from "./user-role.model";
import { ApiProperty } from "@nestjs/swagger";


interface UserCreationAttrs {
    name: string;
    email: string;
    password: string;
}

@Table({ tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({ example: '1', description: 'User id'})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;


    @ApiProperty({ example: 'user1', description: 'Username'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;


    @ApiProperty({ example: 'user1@mail.uz', description: "User's email"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;


    @ApiProperty({ example: 'Uzbek1$t0n', description: "User's password"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;


    @ApiProperty({ example: 'true', description: "User's activation"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_activea: boolean;

    @ApiProperty({ example: ['Roles'], description: "User's roles"})
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}
