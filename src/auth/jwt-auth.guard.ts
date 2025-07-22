
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        // Pass context to handleRequest by binding it
        return super.canActivate(context) as any;
    }
    handleRequest(err, user, info, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const isPublicPermission = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (err || !user) {
            throw err || new UnauthorizedException("Token không hợp lệ");
        }

        //check permissions
        const targetMethod = request.method;
        const targetEndpoint = request.route?.path as string;
        const permissions = user?.permissions || [];
        let isExist = permissions.find((item) => {
            return targetMethod === item.method && targetEndpoint === item.apiPath;
        });
        if (targetEndpoint.startsWith('/api/v1/auth')) { isExist = true; }
        if (!isExist && !isPublicPermission) {
            throw new UnauthorizedException("Bạn không có quyền truy cập vào API này");
        }
        return user;
    }
}



