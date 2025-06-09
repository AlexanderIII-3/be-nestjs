import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser, ICreateUser, IResultUser } from 'src/users/interface/users.interface';
import { ConfigService } from '@nestjs/config';
import ms from 'ms'
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

            const isValid = this.usersService.isValidPasswor(user.password, pass);

            if (isValid === true) {

                return user;
            }
        }
        return null

    }
    async login(user: IUser) {
        const { _id, name, email, role } = user;
        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            name,
            email,
            role
        };
        const refresh_token = this.createRefreshToken(payload)
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
        const { email, password, name, age, gender, address } = user;

        const newUser = await this.usersService.createRegister({
            email,
            password,
            name,
            age,
            gender,
            address,
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
}
