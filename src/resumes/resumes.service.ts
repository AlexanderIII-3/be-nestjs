import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schema/resume.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/interface/users.interface';
import aqp from 'api-query-params';
import { retry } from 'rxjs';
import mongoose from 'mongoose';

@Injectable()
export class ResumesService {
  constructor(private usersService: UsersService,
    @InjectModel(Resume.name) private resumeModel: SoftDeleteModel<ResumeDocument>) { }


  async create(createResumeDto: CreateResumeDto, user: IUser) {
    if (!user) {
      throw new BadRequestException("User not found");
    }
    const set = {
      ...createResumeDto,
      userId: user._id,
      email: user.email,
      status: "PENDING",
      history: [
        {
          status: "PENDING",
          updatedAt: new Date(),
          updatedBy: {
            id: user._id,
            email: user.email,
          }
        }
      ],
      createdBy: {
        id: user._id,
        email: user.email,
      }


    }
    const newResume = await this.resumeModel.create(set);
    return {
      id: newResume._id,
      createdAt: newResume.createdAt,
    };
  }

  async findAll(page: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (page - 1) * limit;
    const limitDefault = limit || 10;
    const totalItems = await this.resumeModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limitDefault);
    const resumes = await this.resumeModel.find(filter)
      .skip(offset)
      .limit(limitDefault)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();
    return {
      result: resumes,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: limitDefault,
      },
    };
  }

  async findOne(id: string) {

    const resume = await this.resumeModel.findById(id);
    if (!resume) {
      throw new BadRequestException("Resume not found");
    }
    return resume;
  }

  async update(id: string, status: string, user: IUser) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Resume not found");
    }
    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      throw new BadRequestException("Invalid status");
    }
    const updated = await this.resumeModel.updateOne(
      { _id: id, isDeleted: false },
      {
        status,
        updatedBy: {
          id: user._id,
          email: user.email,
        },
        // ghi them ban ghi moi vao field history
        $push: {
          history: {
            status: status,
            updatedAt: new Date,
            updatedBy: {
              id: user._id,
              email: user.email,
            },
          },

        }
      }
    )

    return updated;

  }

  async remove(id: string) {
    const resume = await this.resumeModel.findOne({ _id: id, isDeleted: false });
    if (!resume) {
      throw new BadRequestException("Resume not found");
    }
    return this.resumeModel.softDelete({ _id: id });
  }
  async getResumeByUser(user: IUser) {
    const userId: string = user._id.toString();

    const userApply = await this.usersService.findOne(userId);
    if (!userApply) {
      throw new BadRequestException("User not found");
    }
    const resumes = await this.resumeModel.find({ userId: user._id, isDeleted: false })
      .sort("-createdAt")
      .populate([
        {
          path: "companyId",
          select: { name: 1 }
        },
        {
          path: "jobId",
          select: { name: 1 }
        }
      ]);

    return resumes;
  }
}

