import { IsOptional, IsNumber, IsString, IsObject, ValidateNested, IsNotEmptyObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Company } from './create-job.dto';


export class UpdateJobDto {
    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company?: Company;
    @IsOptional()
    @IsString({ message: 'name must be a string' })
    name?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Salary must be a number' })
    salary?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Quantity must be a number' })
    quantity?: number;

    @IsOptional()
    @IsString({ message: 'Level must be a string' })
    level?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Location must be a string' })
    location?: string;
}
