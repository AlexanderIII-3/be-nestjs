import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/interface/users.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() role: CreateRoleDto,
    @User() user: IUser
  ) {
    const params = { ...role, user }

    return this.rolesService.create(params);
  }

  @ResponseMessage('Fetch all roles')
  @Get()
  async findAll(
    @Query('current') page: string,
    @Query('pageSize') limit: string,
    @Query() qs: string
  ) {
    const { result, meta } = await this.rolesService.findAll(+page, +limit, qs);
    return {
      result,
      meta
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const params = { id }
    return this.rolesService.findOne(params);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() role: UpdateRoleDto,
    @User() user: IUser

  ) {
    const params = { ...role, user, id }
    return this.rolesService.update(params);
  }

  @Delete(':id')
  remove(@Param('id') id: string,
    @User() user: IUser) {
    return this.rolesService.remove(id, user);
  }
}
