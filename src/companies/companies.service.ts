import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/interface/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) { }

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const { name, address, description } = createCompanyDto;

    const existingCompany = await this.companyModel.findOne({
      name,
    })
    if (existingCompany) {
      throw new Error('Company already exists');
    } else {
      const company = this.companyModel.create({
        name,
        address,
        description,
        createdBy: {
          id: user._id,
          email: user.email,
        }
      });
      return company;

    }

  }
  async findAll(page: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (page - 1) * limit;
    const defaultLimit = limit || 10;

    const totalItems = await this.companyModel.countDocuments(filter); // tối ưu hơn
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const companies = await this.companyModel.find(filter)
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
      result: companies
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Not found Company ID: ${id}`);
    }
    return this.companyModel.findById(id);

  }

  update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {

    const { name, address, description } = updateCompanyDto;
    const company = this.companyModel.findByIdAndUpdate(id, {

      name,
      address,
      description,
      updatedBy: {
        id: user._id,
        email: user.email,
      }
    }, { new: true });
    return company;
  }

  async remove(id: string, user: IUser) {
    await this.companyModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          id: user._id,
          email: user.email,
        }
      }

    );
    return this.companyModel.softDelete({ _id: id });
  }
}
