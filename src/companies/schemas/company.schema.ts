
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Date, HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
    @Prop()
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop()
    description: string;

    @Prop()
    logo: string;

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

        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop({ type: Date })
    createAt: Date;

    @Prop({ type: Date })
    updateAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop({ type: Date, default: null })
    deletedAt?: Date | null;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
