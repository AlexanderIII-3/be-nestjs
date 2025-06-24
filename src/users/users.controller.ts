import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { Public, ResponseMessage, SkipInterceptor, User } from 'src/decorator/customize';
import { IUser } from './interface/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(

    @Body() createUserDto: CreateUserDto,
    @User() user: IUser) {
    return this.usersService.create(createUserDto, user);
  }
  @ResponseMessage('Fetch all user')
  @Public()
  @Get()
  findAll(
    @Query('current') page: string,
    @Query('pageSize') limit: string,
    @Query() qs: string) {

    return this.usersService.findAll(+page, +limit, qs);
  }
  @ResponseMessage('Fetch user by id')
  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.usersService.findOne(id);
  }
  @ResponseMessage('Update user information')

  @Patch()
  update(
    @Body() req,
    @User() user: IUser,

    @Body() updateUserDto: UpdateUserDto) {

    return this.usersService.update(req._id, updateUserDto, user);
  }
  @ResponseMessage('Delete user')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

