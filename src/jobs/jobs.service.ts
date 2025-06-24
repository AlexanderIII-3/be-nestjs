import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IUser } from 'src/users/interface/users.interface';
import { Job, JobDocument } from './schemas/job.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>) { }

  async create(createJobDto: CreateJobDto, user: IUser) {
    try {
      const jobExist = await this.jobModel.findOne({
        name: createJobDto.name
      })
      if (jobExist) {

        throw new Error('Job already exists');


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

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
