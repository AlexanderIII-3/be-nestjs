import { IUser } from 'src/users/interface/users.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserM, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IResultUser } from './interface/users.interface';
import aqp from 'api-query-params';
import { User } from 'src/decorator/customize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserM.name) private userModel: SoftDeleteModel<UserDocument>) { }
  hashPassword(password: string) {

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    return hash;
  }

  async create(
    createUserDto: CreateUserDto,
    @User() userCre: IUser
  ): Promise<IResultUser> {
    const { email, password, name, age, gender, address, company, role } = createUserDto;
    const hashedPassword = this.hashPassword(password);

    const existingUser = await this.userModel.findOne({
      email,
    })
    console.log('existingUser', existingUser);
    if (existingUser) {

      throw new BadRequestException(`Email ${email} User already exists`);

    } else {
      const user = await this.userModel.create({
        email,
        password: hashedPassword,
        name,
        age,
        gender,
        address,
        company,
        role,
        createdBy: {
          id: userCre._id,
          email: userCre.email,
        }
      });

      return {
        _id: user._id,
        name: user.name,
      };
    }

  }


  async createRegister(createUserDto: RegisterDto): Promise<any> {
    const { email, password, name, age, gender, address } = createUserDto;
    const hashedPassword = this.hashPassword(password);

    const existingUser = await this.userModel.findOne({
      email,
    });
    if (existingUser) {

      throw new BadRequestException(` Email ${email} User already exists`);

    } else {
      const user = await this.userModel.create({
        email,
        password: hashedPassword,
        name,
        age,
        role: 'USER',
        gender,
        address,


      });

      return user;
    }

  }

  async findAll(page: number, limit: number, qs: string) {

    const { filter, sort, projection, population, skip } = aqp(qs);
    filter.isDeleted = false;
    delete filter.page;
    delete filter.limit;


    let offset = (page - 1) * limit;;
    let defaulLimit = limit ? limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / limit);


    const result = await this.userModel.find(filter)
      .select('-password')
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

  findOne(id: string): Promise<IUser> {

    try {
      return this.userModel.findById(

        id, { password: 0 }

      );
    } catch (error) {
      console.log(error);

    }

  }
  findOneByUserName(username: string) {

    try {
      return this.userModel.findOne(

        { email: username }

      );
    } catch (error) {
      console.log(error);

    }

  }
  isValidPasswor(hash: string, password: string): boolean {


    return compareSync(password, hash); // false



  }
  async update(id: string, updateUserDto: CreateUserDto, update: IUser) {
    console.log(update)
    return this.userModel.updateOne(
      { _id: id },
      {
        ...updateUserDto,
        updateAt: new Date(),
        updatedBy: {
          _id: update._id,
          email: update.email,
        },

      },


    )
  }

  async remove(id: string) {

    try {
      return this.userModel.softDelete({ _id: id });
    } catch (error) {
      console.log(error);
    }

  }

  async updateUserRefreshToken(refreshToken: string, _id: object) {
    return await this.userModel.updateOne(
      { _id },
      { refreshToken }

    )


  }

  async findUserByRefreshToken(refreshToken: string) {
    return await this.userModel.findOne(
      { refreshToken }

    )


  }
}
