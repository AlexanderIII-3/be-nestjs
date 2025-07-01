import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import mongoose from "mongoose";

export class CreateResumeDto {

    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty()
    email?: string;

    @IsNotEmpty()
    userId?: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty({ message: 'URL must be a string' })
    url?: string;

    @IsNotEmpty()
    status?: "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED";
    @IsNotEmpty()
    companyId?: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty()
    jobId?: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty()
    history?: Array<{
        status: string;
        updatedAt: Date;
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId;
            email: string;
        };
    }>;

    @IsOptional()
    deletedBy?: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    @IsOptional()
    updatedBy?: {
        id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    @IsOptional()
    createdAt?: Date;
    @IsOptional()
    updatedAt?: Date;



}

export class CreateUserCvDto {
    @IsNotEmpty({ message: 'URL must be a string' })
    url: string;
    @IsNotEmpty({ message: 'Company ID must be a valid MongoDB ID' })
    @IsMongoId()
    companyId: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty({ message: 'Job ID must be a valid MongoDB ID' })
    @IsMongoId()
    jobId: mongoose.Schema.Types.ObjectId;
}