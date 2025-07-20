import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { IUser } from 'src/users/interface/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import aqp from 'api-query-params';
import { PipelineStage } from 'mongoose';


@Injectable()
export class SubscribersService {
  constructor(@InjectModel(Subscriber.name) private subscriberModel: SoftDeleteModel<SubscriberDocument>) { }
  async create(params: CreateSubscriberDto & { user: IUser }) {
    const { email, name, skills } = params;
    const checkExist = await this.subscriberModel.findOne({
      email: params.email,
    });
    if (checkExist) {
      throw new HttpException('Subscriber already exists', HttpStatus.BAD_REQUEST);
    }
    const set = {
      email: params.email,
      name: params.name,
      skills: params.skills,
      createdBy: {
        id: params.user._id,
        email: params.user.email,
      },
      createAt: new Date(),
    };
    const subcriber = await this.subscriberModel.create(set);
    return subcriber;
  }


  async findAll(page: number, limit: number, qs: string) {
    const pageNum = parseInt(page as any) || 1;
    const limitNum = parseInt(limit as any) || 10;
    const offset = (pageNum - 1) * limitNum;

    const { filter, sort, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const pipeline: PipelineStage[] = [
      { $match: filter },
      {
        $project: {
          _id: 1,
          email: 1,
          name: 1,
          skills: 1,
          createdBy: 1,
        },
      },
      { $sort: { createAt: -1 as -1 } },
    ];

    const totalItems = await this.subscriberModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limitNum);

    const subscribers = await this.subscriberModel.aggregate(pipeline)
      .skip(offset)
      .limit(limitNum)
      .exec();

    return {
      meta: {
        current: pageNum,
        pageSize: limitNum,
        pages: totalPages,
        total: totalItems,
      },
      result: subscribers,
    };
  }

  async findOne(id: string) {
    const sub = await this.subscriberModel.findOne(
      { _id: id, isDeleted: false });
    if (!sub) {
      throw new HttpException(`Subscriber with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return sub;
  }

  async update(params: { id: string, updateSubscriberDto: UpdateSubscriberDto, user: IUser }) {
    const sub = await this.subscriberModel.findOneAndUpdate(
      { _id: params.id, isDeleted: false },
      {
        ...params.updateSubscriberDto,
        updatedBy: {
          id: params.user._id,
          email: params.user.email,
        },
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (!sub) {
      throw new HttpException(`Subscriber with ID ${params.id} not found`, HttpStatus.NOT_FOUND);
    }
    return sub;
  }

  async remove(id: string) {
    const sub = await this.subscriberModel.softDelete(
      { _id: id, isDeleted: false }
    );
    if (!sub) {
      throw new HttpException(`Subscriber with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return sub;
  }
}
