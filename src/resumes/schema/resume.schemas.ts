import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/companies/schemas/company.schema';
import { Job } from 'src/jobs/schemas/job.schemas';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
    @Prop()
    email: string;

    @Prop()
    userId: mongoose.Schema.Types.ObjectId;

    @Prop()
    url: string;

    @Prop()
    status: "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED";

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    companyId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Job.name })
    jobId: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: [
            {
                status: String,
                updatedAt: Date,
                updatedBy: {
                    id: mongoose.Schema.Types.ObjectId,
                    email: String,
                },
            },
        ],
    })
    history: Array<{
        status: string;
        updatedAt: Date;
        updatedBy: {
            id: mongoose.Schema.Types.ObjectId;
            email: string;
        };
    }>;

    @Prop({ type: Object })
    createdBy: {
        id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop({ type: Object })
    updatedBy: {
        id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt?: Date;

    @Prop({ default: false })
    isDeleted?: boolean;

    @Prop({ type: Date, default: null })
    deletedAt?: Date | null;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);