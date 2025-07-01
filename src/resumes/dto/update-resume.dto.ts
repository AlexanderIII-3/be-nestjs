import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import mongoose from 'mongoose';
import { Types } from 'mongoose';


class UpdatedBy {
    @IsNotEmpty()
    id: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
class History {
    @IsNotEmpty()
    status: string;
    @IsNotEmpty()
    updatedAt: Date;
    @IsNotEmpty()
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
}

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
    @IsOptional()
    email?: string;
    @IsOptional()
    userId?: mongoose.Schema.Types.ObjectId;
    @IsOptional()
    url?: string;
    @IsOptional()
    status?: "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED";
    @IsOptional()
    companyId?: mongoose.Schema.Types.ObjectId;
    @IsOptional()
    jobId?: mongoose.Schema.Types.ObjectId;

    @IsOptional()
    @Type(() => History)
    history?: History[];

    @IsOptional()
    deletedBy?: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    @IsOptional()
    @Type(() => UpdatedBy)
    updatedBy?: UpdatedBy
    @IsOptional()
    updatedAt?: Date;
}
