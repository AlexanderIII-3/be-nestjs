import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/interface/users.interface';
import { RoleService } from './service/role.service';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { ICheckRoleExists } from './interface/role.interface';
import { ADMIN_ROLE } from "src/databases/sample";
import aqp from 'api-query-params';

@Injectable()
export class RolesService {
  constructor(private readonly roleService: RoleService,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>) { }



  async create(params: CreateRoleDto & { user: IUser }) {
    await this.roleService.checkNameRoleExists(params);
    await this.roleService.checkPermissionExists(params.permissions);
    const role = await this.roleModel.create({
      ...params,
      createdBy: params.user._id,
      createdAt: new Date(),
    });


    return {
      id: role._id,
      createdAt: role.createdAt,
    }
  }

  async findAll(page: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (page - 1) * limit;
    const defaultLimit = limit || 10;

    const totalItems = await this.roleModel.countDocuments(filter); // tối ưu hơn
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const roles = await this.roleModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: page,
        pageSize: defaultLimit,
        pages: totalPages,
        total: totalItems
      },
      result: roles
    };
  }
  //
  async findOne(params: ICheckRoleExists & { id: string; }) {
    await this.roleService.checkRoleExists(params);

    return (await this.roleModel.findById({ _id: params.id })).populate({
      path: "permissions",
      match: { isDeleted: false },
      select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 }
    });

  }

  async update(params: UpdateRoleDto & { user: IUser, id: string }) {
    // if (params.name) {
    //   await this.roleService.checkNameRoleExists(params);

    // }
    await this.roleService.checkPermissionExists(params.permissions);

    const role = await this.roleModel.updateOne(
      { _id: params.id },
      {
        ...params,
        updatedBy: {
          id: params.user._id,
          email: params.user.email,
        },
        updatedAt: new Date(),
      },
      { new: true }
    );

    return role;
  }

  async remove(id: string, user: IUser) {
    const foundRole = await this.roleModel.findById({ _id: id });
    if (foundRole.name === ADMIN_ROLE) {
      throw new BadRequestException({
        message: `You cannot delete an admin role`,
        statusCode: 400,
      });

    }

    const role = await this.roleModel.findById(
      {
        _id: id,
        is_active: false,
        isDeleted: false,
      },

    );
    if (!role) {
      throw new Error(`Role with id ${id} not found or already deleted.`);
    }

    await this.roleModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.roleModel.softDelete({
      _id: id,
    });
  }
}
