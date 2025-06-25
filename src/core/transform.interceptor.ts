import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

export interface Response<T> {
    statusCode: number;
    message?: string;
    data: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
    constructor(private reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const skip = this.reflector.get<boolean>('skipTransform', context.getHandler());
        if (skip) return next.handle();

        return next.handle().pipe(
            map((data) => {
                const statusCode = context.switchToHttp().getResponse().statusCode;
                const message = this.reflector.get<string>('RESPONSE_MESSAGE', context.getHandler()) || '';

                if (
                    typeof data === 'object' &&
                    data !== null &&
                    'result' in data &&
                    'meta' in data
                ) {
                    return {
                        statusCode,
                        message,
                        data,
                    };
                }

                return {
                    statusCode,
                    message,
                    data,
                    meta: {},
                };
            })
            // KHÔNG dùng catchError ở đây!
        );
    }
}