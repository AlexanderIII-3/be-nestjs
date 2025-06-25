import { Transform, Type } from 'class-transformer';
import { IsString, IsInt, IsEmail, IsEmpty, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested, IsOptional, IsDate } from 'class-validator';

import mongoose from 'mongoose';
import { IsEndDateAfterStartDate } from '../validate/validate.date';
export class Company {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    name: mongoose.Schema.Types.ObjectId;
}
export class CreateJobDto {


    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Skill must be a array' })
    skills: string[];
    @IsOptional()
    @IsNotEmpty({ message: 'Role must be a string' })
    role?: string;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company!: Company;
    @IsNotEmpty({ message: 'Salary must be a number' })
    salary: number;
    @IsNotEmpty({ message: 'Quantity must be a number' })
    quantity: number;
    @IsNotEmpty({ message: 'Level must be a string' })
    level: string;
    @IsNotEmpty({ message: 'Description must be a string' })
    description: string;

    @IsNotEmpty({ message: 'Start date must be a string' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'Start date must be a valid date' })
    startDate: Date;

    @IsNotEmpty({ message: 'End date must be a string' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'End date must be a valid date' })
    @IsEndDateAfterStartDate({ message: 'End date must be after start date' })
    endDate: Date;

    @IsOptional()
    @IsString({ message: 'Location must be a string' })
    location?: string;

    createdAt: Date;
    updatedAt: Date;


}