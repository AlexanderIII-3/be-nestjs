import mongoose, { Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    email: string;
    password: string;
    name?: string;
    phone?: string;
    age?: string;
    address?: string;
    gender?: string;
    role: {
        _id: string;
        name: string;
    };
    permissions?: {
        _id: Types.ObjectId;
        name: string;
        apiPath: string;
        module: string;
    }[];
    refreshToken?: string;
    company?: {
        _id: Types.ObjectId;
        name: string;
    };
    createdBy?: {
        id: Types.ObjectId;
        email: string;
    };
    deletedBy?: {
        _id: Types.ObjectId;
        email: string;
    };
    updatedBy?: {
        _id: Types.ObjectId;
        email: string;
    };
    createAt?: Date;
    updateAt?: Date;
    isDeleted?: boolean;
    deletedAt?: Date | null;
}
export interface ICreateUser {
    email: string;
    password: string;
    name?: string;
    phone?: string;
    age?: number;
    address?: string;
    gender?: string;
    role?: string;
    company?: {
        _id: Types.ObjectId;
        name: string;
    };
    createdBy?: {
        id: Types.ObjectId;
        email: string;
    };
}
export interface IResultUser {
    _id: mongoose.Schema.Types.ObjectId;
    name?: string;
    email?: string;
    role?: string;
}