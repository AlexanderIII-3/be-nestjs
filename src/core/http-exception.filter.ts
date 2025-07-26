
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { error } from 'console';
import { Request, Response } from 'express';
import { stat } from 'fs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                // statusCode: status,
                // timestamp: new Date().toISOString(),
                // path: request.url,
                error: "File to large to upload",
                message: "File size exceeds the limit",
                statusCode: status,
            });
    }
}
