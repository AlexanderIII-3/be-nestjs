import { User } from './../users/schemas/user.schema';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/interface/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel(Permission.name) private permissionModel: SoftDeleteModel<PermissionDocument>) { }

  async create(permission: CreatePermissionDto, user: IUser): Promise<PermissionDocument> {
    await this.checkPermissionExist(permission.name);

    let set = {
      ...permission,
      createdBy: {
        id: user._id,
        email: user.email,
      }
    }
    const result = await this.permissionModel.create(set);
    return result;

  }

  async findAll(page: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (page - 1) * limit;
    const defaultLimit = limit || 10;

    const totalItems = await this.permissionModel.countDocuments(filter); // tối ưu hơn
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const permissions = await this.permissionModel.find(filter)
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
      result: permissions
    };
  }

  async findOne(id: string) {
    return await this.permissionModel.findById(id).exec();
  }

  async update(params: UpdatePermissionDto & { id: string; user: IUser }) {
    await this.checkPermissionExist(params.name, params.id);
    let filter: object = {
      _id: params.id,
      is_active: true
    }
    const exist = await this.permissionModel.findOne(filter)

    if (!exist) {
      throw new BadRequestException({
        message: 'Permission not found',
        value: `${params.id}`,
        statusCode: 404,
        error: 'Not Found',
      })
    }
    return await this.permissionModel.updateOne(
      {
        $set: {
          ...params,
          updatedBy: {
            id: params.user._id,
            email: params.user.email,
          },
          updatedAt: new Date(),
        }
      }

    )

  }

  async remove(id: string) {
    const exist = await this.permissionModel.findOne({ _id: id, is_active: true });
    if (!exist) {
      throw new BadRequestException({
        message: 'Permission not found',
        value: `${id}`,
        statusCode: 404,
        error: 'Not Found',
      })
    }

    return await this.permissionModel.softDelete({ _id: id });
  }

  async checkPermissionExist(name: string, id?: string) {

    const isExist = await this.permissionModel.find(

      {
        name: { $regex: name, $options: 'i' },
        _id: { $ne: id }
      },
    );
    if (isExist.length > 0) {
      throw new BadRequestException({
        message: 'Permission already exists',
        value: `Name: ${name}`,
        statusCode: 400,
        error: 'Bad Request',
      })
    }
  }
}
