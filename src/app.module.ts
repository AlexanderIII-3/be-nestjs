import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { AuthService } from './auth/auth.service';
import { CompaniesModule } from './companies/companies.module';
import { AuthController } from './auth/auth.controller';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [

        ConfigModule.forRoot({
          validationSchema: Joi.object({
            NODE_ENV: Joi.string()
              .valid('development', 'production', 'test', 'provision')
              .default('development'),
            PORT: Joi.number().port().default(3000),
          }),
        }),

      ],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          connection.plugin(softDeletePlugin); // Thêm dòng này để kích hoạt soft delete
          return connection;
        }
      }),
      inject: [ConfigService],



    }),

    ConfigModule.forRoot(

      {
        isGlobal: true,

      }
    ),

    UsersModule,

    AuthModule,

    CompaniesModule

  ],

  controllers: [AppController, AuthController],
  providers: [
    AppService,


  ],
})
export class AppModule { }
