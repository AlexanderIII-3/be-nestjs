import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { Resume, ResumeSchema } from './schema/resume.schemas';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }])
  ],
  controllers: [ResumesController],
  providers: [ResumesService],
  exports: [ResumesService],

})
export class ResumesModule { }
