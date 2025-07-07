import { RegisterDto } from 'src/users/dto/create-user.dto';
import { Public, ResponseMessage, SkipInterceptor, User } from './../decorator/customize';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Controller, Post, UseGuards, Get, Body, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { IUser } from 'src/users/interface/users.interface';
import { Role } from 'src/roles/schemas/role.schema';
import { RolesService } from 'src/roles/roles.service';
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private roleService: RolesService
    ) { }
    @Public()
    // @UseGuards(LocalAuthGuard)
    @Post('/login')
    handleLogin(
        @Body() user: any,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.login(user, response);
    }
    @Public()
    @Post('/register')
    handleRegister(@Body() req: RegisterDto): Promise<any> {
        return this.authService.register(req);
    }

    @Get('/account')
    async getAccount(
        @User() user: IUser

    ) {
        const id = user.role._id as string;
        const temp = await this.roleService.findOne({ id }) as any;
        user.permissions = temp.permissions
        return { user }
    }
    @Public()
    @ResponseMessage("Get user by refresh token")
    @Get('/refresh')
    handleRefreshToken(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ) {
        const refreshToken = request.cookies["refresh_token"]
        return this.authService.processNewToken(refreshToken, response)
    }

    @ResponseMessage("Logout")
    @Post('/logout')
    handleLogout(
        @User() user: IUser,
        @Res({ passthrough: true }) response: Response

    ) {

        return this.authService.handleLogoutService(user, response)
    }

}
