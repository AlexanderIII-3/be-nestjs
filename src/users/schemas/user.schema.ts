
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { Role } from 'src/roles/schemas/role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    _id: mongoose.Schema.Types.ObjectId;
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    name: string;

    @Prop()
    phone: string;

    @Prop()
    age: string;

    @Prop()
    address: string;

    @Prop()
    gender: string;


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
    role: mongoose.Schema.Types.ObjectId;

    @Prop()
    refreshToken: string;

    @Prop({ type: Object })
    company: {

        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    }



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
    updateAt?: Date;

    @Prop()
    isDeleted?: boolean;

    @Prop({ type: Date, default: null })
    deletedAt?: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
