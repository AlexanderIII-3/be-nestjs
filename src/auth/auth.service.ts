import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser, ICreateUser } from 'src/users/interface/users.interface';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,

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
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
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
        return {
            access_token: this.jwtService.sign(payload),
            _id,
            name,
            email,
            role
        };

    }
    async register(user: ICreateUser): Promise<any> {
        const { email, password, name, age, gender, address } = user;
        const existingUser = await this.usersService.findOneByUserName(email);
        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        } else {
            const newUser = await this.usersService.createRegister({
                email,
                password,
                name,
                age,
                gender,
                address,
                createAt: new Date(),
            });
            return newUser;
        }
    }
}
