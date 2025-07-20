import { IsArray, IsEmail, IsNotEmpty } from "class-validator";

export class CreateSubscriberDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsArray()
    skills: string[];
}
