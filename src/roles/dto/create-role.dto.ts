import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import mongoose, { mongo } from "mongoose";

export class CreateRoleDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
    @IsNotEmpty()
    @IsMongoId({ each: true })
    @IsArray()
    permissions: mongoose.Schema.Types.ObjectId[];
}
