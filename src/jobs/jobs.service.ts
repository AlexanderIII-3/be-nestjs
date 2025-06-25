import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IUser } from 'src/users/interface/users.interface';
import { Job, JobDocument } from './schemas/job.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>) { }

  async create(createJobDto: CreateJobDto, user: IUser) {
    try {
      const jobExist = await this.jobModel.findOne({
        name: createJobDto.name
      })
      if (jobExist) {
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

  findAll() {
    return `This action returns all jobs`;
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
    };
    if (id) {
      filter._id = id;
    }
    const job = await this.jobModel.findOne(filter);
    if (!job) {
      throw new BadRequestException(`Job not found by id: ${id}`);
    }

    return await this.jobModel.softDelete({ _id: id });
  }
}
