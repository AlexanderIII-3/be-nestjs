import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsInt, IsEmail, IsEmpty, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';
import { Role } from 'src/roles/schemas/role.schema';

class Company {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    name: mongoose.Schema.Types.ObjectId;
}
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
    phone?: string;
    @IsNotEmpty({ message: 'Age must be a number' })
    age: number;
    @IsNotEmpty({ message: 'Role must be a string' })
    @IsMongoId()
    role: mongoose.Schema.Types.ObjectId;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company!: Company;

    @IsNotEmpty()
    address?: string;

    @IsNotEmpty()
    gender?: string;

}
export class RegisterDto {
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsNotEmpty({ message: 'Name is required' })
    name: string;
    phone?: string;
    role?: string;

    @IsNotEmpty({ message: 'Age must be a number' })
    age?: number;
    address?: string;
    gender?: string;
    createAt: Date;
    updateAt?: Date;


}
export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty({ message: 'Name is required' })
    name: string;
    phone?: string;
    @IsNotEmpty({ message: 'Age must be a number' })
    age: number;
    @IsNotEmpty({ message: 'Role must be a string' })
    role: string;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company?: Company;

    address?: string;
    gender?: string;
    createAt: Date;
    updateAt: Date;


}
export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'thanhkun', description: 'username' })
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '123456',
        description: 'password',
    })
    readonly password: string;

}
