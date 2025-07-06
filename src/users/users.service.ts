import { IUser } from 'src/users/interface/users.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterDto, UpdateUserDto } from './dto/create-user.dto';
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
    delete filter.current;
    delete filter.pageSize;


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

  async findOne(id: string): Promise<IUser> {
    return this.userModel.findOne(
      { _id: id },
    )
      .select("-password")
      .populate({ path: "role", select: { name: 1, _id: 1 } })


  }
  async findOneByUserName(username: string) {
    try {
      const user = await this.userModel.findOne({
        email: username,
        isDeleted: false,
      })
        .populate({ path: "role", select: { name: 1, permissions: 1 } })
      if (!user) {
        throw new BadRequestException(`User with email ${username} not found`);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  isValidPassword(hash: string, password: string): boolean {
    return compareSync(password, hash); // false
  }
  async update(id: string, updateUserDto: UpdateUserDto, update: IUser) {
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

  async remove(id: string, user: IUser) {
    const foundUser = await this.userModel.findById({ _id: id });
    if (foundUser.name === 'admin@gmail.com') {
      throw new BadRequestException({
        message: `You cannot delete an admin user`,
        statusCode: 400,
      });

    }
    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.userModel.softDelete(
      { _id: id },
    );

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
