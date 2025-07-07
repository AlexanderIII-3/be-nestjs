import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { Permission, PermissionSchema } from 'src/permissions/schemas/permission.schema';
import { RoleService } from './service/role.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RoleService],
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  exports: [RolesService, RoleService],
})
export class RolesModule { }
