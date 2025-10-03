import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IUser } from 'src/users/interface/users.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}
  @ResponseMessage('Create Resume')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createResumeDto: CreateUserCvDto, @User() user: IUser) {
    return this.resumesService.create(createResumeDto, user);
  }

  // @UseGuards(JwtAuthGuard)
  @ResponseMessage('Fetch all resumes with paginate')
  @Public()
  @Get()
  async findAll(
    @Query('current') page: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    const { result, meta } = await this.resumesService.findAll(
      +page,
      +limit,
      qs,
    );
    return {
      result,
      meta,
    };
  }
  @ResponseMessage('Fetch a resume by id')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @ResponseMessage('Update resume ')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('status') status: string,
    @User() user: IUser,
  ) {
    return this.resumesService.update(id, status, user);
  }
  @ResponseMessage('Delete a resume by id')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumesService.remove(id);
  }
  @Post('by-user')
  getResumeByUser(@User() user: IUser) {
    return this.resumesService.getResumeByUser(user);
  }
}
