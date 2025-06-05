import { RegisterDto } from 'src/users/dto/create-user.dto';
import { Public } from './../decorator/customize';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    handleLogin(@Request() req): any {

        return this.authService.login(req.user);

    } @Public()
    @Post('/register')
    handleRegister(@Body() req: RegisterDto): Promise<any> {
        return this.authService.register(req);
    }

}
