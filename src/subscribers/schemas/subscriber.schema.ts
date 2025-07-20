import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type SubscriberDocument = HydratedDocument<Subscriber>;
@Schema({ timestamps: true })
export class Subscriber {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: [String], required: true })
    skills: string[];

    @Prop(
        raw({
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            email: String,
        })
    )
    createdBy: {
        id: mongoose.Types.ObjectId;
        email: string;
    };

    @Prop(
        raw({
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            email: String,
        })
    )
    deletedBy?: {
        _id: mongoose.Types.ObjectId;
        email: string;
    };

    @Prop(
        raw({
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            email: String,
        })
    )
    updatedBy?: {
        _id: mongoose.Types.ObjectId;
        email: string;
    };

    @Prop({ type: Date })
    createAt: Date;

    @Prop({ type: Date })
    updateAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop({ type: Date, default: null })
    deletedAt?: Date | null;

}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);