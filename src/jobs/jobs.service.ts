import { BadRequestException, Injectable, Query, Req } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IUser } from 'src/users/interface/users.interface';
import { Job, JobDocument } from './schemas/job.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>) { }

  async create(createJobDto: CreateJobDto, user: IUser) {
    try {
      const jobExist = await this.jobModel.findOne({
        name: createJobDto.name
      })
      if (!jobExist) {
        throw new BadRequestException('Job already exists');
      } else {

        let data = await this.jobModel.create({
          ...createJobDto,
          createdBy: {
            id: user._id,
            email: user.email,
          },

        })
        return {
          id: data._id,
          time_create: data.createdAt
        };
      }


    } catch (error) {
      console.error('Error creating job:', error);
    }

  }

  async findAll(page: number, limit: number, qs: any) {

    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (page - 1) * limit;
    const defaultLimit = limit || 10;

    const totalItems = await this.jobModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const jobs = await this.jobModel.find(filter)
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
      result: jobs
    };

    return
  }

  async findOne(id: string) {
    const filter: FilterQuery<any> = {
      _id: id,
      isDeleted: false
    };
    const job = await this.jobModel.findOne(filter);
    if (!job) {
      throw new BadRequestException(`Job not found by id: ${id}`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    return await this.jobModel.updateOne(
      { _id: id },
      {
        ...updateJobDto,
        updatedBy: {
          id: user._id,
          email: user.email,
        },
      }
    );


  }

  async remove(id: string, user: IUser) {
    const filter: any = {
      isDeleted: false,
      _id: id,
    };
    if (id) {
      filter._id = id;
    }
    const job = await this.jobModel.updateOne(
      filter,
      { deletedBy: { id: user._id, email: user.email } }
    );
    if (!job) {
      throw new BadRequestException(`Job not found by id: ${id}`);
    }

    return await this.jobModel.softDelete({ _id: id });
  }
}
