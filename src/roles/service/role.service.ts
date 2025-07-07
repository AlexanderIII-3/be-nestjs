import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { Role, RoleDocument } from "../schemas/role.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException } from "@nestjs/common";
import { Permission, PermissionDocument } from "src/permissions/schemas/permission.schema";
import { ICheckRoleExists } from "../interface/role.interface";
import { FilterQuery } from "mongoose";
export class RoleService {
    constructor(
        @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
        @InjectModel(Permission.name) private permissionModel: SoftDeleteModel<PermissionDocument>) { }

    async checkNameRoleExists(params: ICheckRoleExists): Promise<void> {
        let filter: FilterQuery<ICheckRoleExists> = {
            is_active: true,
            isDeleted: false
        };
        if (params.name) {
            filter.name = { $regex: params.name, $options: 'i' };
        }
        if (params.id) {
            filter.id = params.id;
        }
        const existRole = await this.roleModel.findOne(filter).exec();
        if (existRole) {
            throw new BadRequestException({
                message: `Role with name "${params.name}${params.id ? ` and id "${params.id}"` : ''}" already exists.`,
                statusCode: 400
            });
        }
    }
    async checkRoleExists(params: ICheckRoleExists): Promise<void> {
        let filter: FilterQuery<ICheckRoleExists> = {
            isDeleted: false
        };
        if (params.name) {
            filter.name = { $regex: params.name, $options: 'i' };
        }
        if (params.id) {
            filter._id = params.id;
        }
        const existRole = await this.roleModel.findOne(filter).exec();
        if (!existRole) {
            throw new BadRequestException({
                statusCode: 400,
                message: `Role does not exist.`,
                value: params.id
            });
        }
    }
    async checkPermissionExists(ids: any): Promise<void> {
        let count = 0;
        for (const id of ids) {
            const existPermission = await this.permissionModel.findOne({
                _id: id,
                is_active: true
            }).exec();
            if (existPermission) {
                count++;
            }

        }
        if (count !== ids.length) {
            throw new BadRequestException({
                message: `Some permissions do not exist.`,
                statusCode: 400
            });
        }
    }
}

