import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose, { mongo } from "mongoose";

export class CreateRoleDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    @IsBoolean()
    is_active: boolean;
    @IsNotEmpty()
    @IsMongoId()
    @IsArray()
    permissions: mongoose.Schema.Types.ObjectId[];
}
