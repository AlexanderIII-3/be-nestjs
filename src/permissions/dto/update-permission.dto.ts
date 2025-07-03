import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    @IsNotEmpty()
    name?: string;
    @IsNotEmpty()
    apiPath?: string;
    @IsNotEmpty()
    method?: string;
    @IsNotEmpty()
    module?: string;

}
