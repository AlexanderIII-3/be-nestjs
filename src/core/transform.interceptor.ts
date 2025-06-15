import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

export interface Response<T> {
    statusCode: number;
    message?: string;
    data: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const skip = this.reflector.get<boolean>('skipTransform', context.getHandler());
        if (skip) return next.handle();

        return next.handle().pipe(
            map((data) => {
                const statusCode = context.switchToHttp().getResponse().statusCode;
                const message = this.reflector.get<string>('RESPONSE_MESSAGE', context.getHandler()) || '';

                // Nếu data đã có dạng { result, meta }, thì gói thẳng vào data
                if (
                    typeof data === 'object' &&
                    data !== null &&
                    'result' in data &&
                    'meta' in data
                ) {
                    return {
                        statusCode,
                        message,
                        data, // dùng nguyên object đã có { result, meta }
                    };
                }

                // Trường hợp khác: gói lại theo cấu trúc chuẩn
                return {
                    statusCode,
                    message,
                    data: {
                        result: data,
                        meta: {},
                    },
                };
            }),
        );
    }
}
