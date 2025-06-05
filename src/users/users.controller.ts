import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './interface/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(

    @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ResponseMessage('Fetch all user')
  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
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

    @Body() updateUserDto: CreateUserDto) {

    console.log('req', user);
    return this.usersService.update(req._id, updateUserDto, user);
  }
  @ResponseMessage('Delete user')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

