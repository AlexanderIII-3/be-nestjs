import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { IUser } from 'src/users/interface/users.interface';
import { PublicPermission, ResponseMessage, User } from 'src/decorator/customize';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) { }
  @ResponseMessage('Create a new subscriber')
  @Post()
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,

    @User() user: IUser) {
    return this.subscribersService.create({ ...createSubscriberDto, user });
  }

  @ResponseMessage('Fetch all subscribers')
  @Get()
  async findAll(
    @Query('current') page: string,
    @Query('pageSize') limit: string,
    @Query() qs: string
  ) {
    const { result, meta } = await this.subscribersService.findAll(+page, +limit, qs);
    return {
      result,
      meta
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch()
  @PublicPermission()
  update(
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: IUser
  ) {
    const params = {
      updateSubscriberDto,
      user
    }
    return this.subscribersService.update(params);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscribersService.remove(id);
  }
  @Post("skills")
  @ResponseMessage("get subscriber skills")
  @PublicPermission()
  getSkills(@User() user: IUser) {
    return this.subscribersService.getSkills(user);
  }
}
