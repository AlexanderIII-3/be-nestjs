import { RegisterDto } from 'src/users/dto/create-user.dto';
import { Public } from './../decorator/customize';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Controller, Post, UseGuards, Get, Body, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    handleLogin(
        @Req() req,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.login(req.user, response);

    }
    @Public()
    @Post('/register')
    handleRegister(@Body() req: RegisterDto): Promise<any> {
        return this.authService.register(req);
    }

}
