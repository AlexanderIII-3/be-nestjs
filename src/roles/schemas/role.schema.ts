
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { Permission } from 'src/permissions/schemas/permission.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ default: true })
    is_active: boolean;


    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Permission.name })
    permissions: Permission[];

    @Prop({ type: Object })
    createdBy: {

        id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop({ type: Object })
    deletedBy: {

        id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop({ type: Object })
    updatedBy: {

        id: mongoose.Schema.Types.ObjectId;
        email: string;
    }



    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt?: Date;

    @Prop({ default: false })
    isDeleted?: boolean;

    @Prop({ type: Date, default: null })
    deletedAt?: Date | null;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
