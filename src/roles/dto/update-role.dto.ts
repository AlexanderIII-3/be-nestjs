import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsArray, IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsOptional()
    name: string;
    @IsOptional()
    description: string;
    @IsOptional()
    @IsBoolean()
    isActive: boolean;
    @IsOptional()
    @IsMongoId({ each: true })
    @IsArray()
    permissions: mongoose.Schema.Types.ObjectId[];
}
