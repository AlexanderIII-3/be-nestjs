import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from 'src/permissions/schemas/permission.schema';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
    private readonly logger = new Logger(DatabasesService.name);

    constructor(
        @InjectModel(User.name)
        private userModel: SoftDeleteModel<UserDocument>,

        @InjectModel(Permission.name)
        private permissionModel: SoftDeleteModel<PermissionDocument>,

        @InjectModel(Role.name)
        private roleModel: SoftDeleteModel<RoleDocument>,

        private configService: ConfigService,
        private userService: UsersService
    ) { }


    async onModuleInit() {
        const isInit = this.configService.get<boolean>("SHOULD_INIT");
        if (isInit) {
            const permissions = await this.permissionModel.count({});
            if (permissions === 0) {
                this.logger.log("Initializing permissions...");
                await this.permissionModel.insertMany(INIT_PERMISSIONS);
            }
            const roles = await this.roleModel.count({});
            if (roles === 0) {
                await this.roleModel.insertMany([{
                    name: ADMIN_ROLE,
                    description: "Super Admin Role",
                    is_active: true,
                    permissions: await this.permissionModel.find({}).select("_id").lean().exec(),

                },
                {
                    name: USER_ROLE,
                    description: "Người dùng/Ứng viên sử dụng hệ thống",
                    isActive: true,
                    permissions: []

                }
                ])
            }
            const users = await this.userModel.count({});
            if (users === 0) {
                const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE }).select("_id").lean().exec();
                const userRole = await this.roleModel.findOne({ name: USER_ROLE }).select("_id").lean().exec();

                await this.userModel.insertMany([
                    {
                        name: "I'm admin",
                        email: "admin@gmail.com",
                        password: this.userService.hashPassword(this.configService.get<string>("INIT_PASSWORD")),
                        age: 69,
                        gender: "MALE",
                        address: "VietNam",
                        role: adminRole?._id
                    },
                    {
                        name: "I'm Thanhkun",
                        email: "thanhkun@gmail.com",
                        password: this.userService.hashPassword(this.configService.get<string>("INIT_PASSWORD")),
                        age: 96,
                        gender: "MALE",
                        address: "VietNam",
                        role: adminRole?._id
                    },
                    {
                        name: "I'm normal user",
                        email: "user@gmail.com",
                        password: this.userService.hashPassword(this.configService.get<string>("INIT_PASSWORD")),
                        age: 69,
                        gender: "MALE",
                        address: "VietNam",
                        role: [userRole?._id]
                    },
                ])
            }

            if (users > 0 && roles > 0 && permissions > 0) {
                this.logger.log('>>> ALREADY INIT SAMPLE DATA...');
            }
        }
    }
}

