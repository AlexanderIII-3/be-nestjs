
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    skills: string[];

    @Prop({ type: Object })
    company: {

        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop()
    lacation: string;

    @Prop()
    salary: number;

    @Prop()
    quantity: number;

    @Prop()
    level: string;

    @Prop()
    description: string;



    @Prop({ type: Object })
    createdBy: {

        id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop({ type: Object })
    deletedBy: {

        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop({ type: Object })
    updatedBy: {

        id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop({ type: Date })
    startDate: Date;

    @Prop({ type: Date })
    endDate: Date;

    @Prop({ default: true })
    is_active: boolean;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt?: Date;

    @Prop({ default: false })
    isDeleted?: boolean;

    @Prop({ type: Date, default: null })
    deletedAt?: Date | null;
}

export const JobSchema = SchemaFactory.createForClass(Job);
