import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser, ICreateUser, IResultUser } from 'src/users/interface/users.interface';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import ms from 'ms';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private configService: ConfigService,

        private jwtService: JwtService

    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUserName(username);
        if (user) {
            const isValid = this.usersService.isValidPassword(user.password, pass);

            if (isValid === true) {

                return user;
            }
        }
        return null

    }
    async login(account: any, response: Response): Promise<any> {
        console.log("account", account);
        let user = await this.validateUser(account.username, account.password);
        const { _id, name, email, role } = user;
        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            name,
            email,
            role
        };
        // create refresh token
        const refresh_token = this.createRefreshToken(payload)
        // set refresh token for user
        await this.usersService.updateUserRefreshToken(refresh_token, _id)
        //set cookies refresh token
        const maxAge = parseInt(this.configService.get<string>("JWT_REFRESH_EXPIRE") ?? "86400000", 10);

        response.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge,
        });
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token,
            user: {

                _id,
                name,
                email,
                role
            }

        };

    }
    async register(user: ICreateUser): Promise<IResultUser> {
        const { email, password, name, age, gender, address, role } = user;

        const newUser = await this.usersService.createRegister({
            email,
            password,
            name,
            age,
            gender,
            address,
            role,
            createAt: new Date(),
        });
        return {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        };

    }

    createRefreshToken = (payload: any) => {
        const refresh_token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRE"),

        })
        return refresh_token


    }
    async processNewToken(refreshToken: string, response: Response) {
        try {
            // this.jwtService.verify(refreshToken, {
            //     secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET")

            // })
            let user = await this.usersService.findUserByRefreshToken(refreshToken)
            if (user) {
                // update refresh token
                const { _id, name, email, role } = user;
                const payload = {
                    sub: "refresh token",
                    iss: "from server",
                    _id,
                    name,
                    email,
                    role
                };
                // create refresh token
                const refresh_token = this.createRefreshToken(payload)
                // set refresh token for user
                await this.usersService.updateUserRefreshToken(refresh_token, _id)
                //set cookies refresh token
                const maxAge = parseInt(this.configService.get<string>("JWT_REFRESH_EXPIRE") ?? "86400000", 10);
                response.clearCookie('refresh_token')
                response.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    maxAge,
                });
                return {
                    access_token: this.jwtService.sign(payload),
                    refresh_token,
                    user: {

                        _id,
                        name,
                        email,
                        role
                    }

                };

            } else {
                throw new BadRequestException('Refresh token không hợp lệ')

            }
        } catch (error) {
            throw new BadRequestException('Refresh token không hợp lệ')
        }
    }
    async handleLogoutService(user: IUser, respone: Response) {
        const { _id } = user
        try {
            await this.usersService.updateUserRefreshToken("", _id)
            respone.clearCookie("refresh_token")
            return "oke"
        } catch (error) {
            throw new BadRequestException('Refresh token không hợp lệ')

        }


    }
}
