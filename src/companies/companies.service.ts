import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/interface/users.interface';
import aqp from 'api-query-params';

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

    const { filter, sort, projection, population, skip } = aqp(qs);
    delete filter.page;
    delete filter.limit;


    let offset = (page - 1) * limit;;
    let defaulLimit = limit ? limit : 10;

    const totalItems = (await this.companyModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / limit);


    const result = await this.companyModel.find(filter)
      .skip(offset)
      .limit(defaulLimit)
      .sort(sort as any)
      .populate(population)
      .exec();
    return {
      meta: {
        current: page, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
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
