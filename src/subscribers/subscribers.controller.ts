import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { IUser } from 'src/users/interface/users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: IUser
  ) {
    const params = {
      id,
      updateSubscriberDto,
      user
    }
    return this.subscribersService.update(params);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscribersService.remove(id);
  }
}
