import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomHttpException } from './custom-http-exception';
import { BAD_REQUEST_EXCEPTION, FORBIDDEN_EXCEPTION } from './exceptions.constant';

//TODO: describe types for classEntity-validator exceptions
@Catch(HttpException, CustomHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: CustomHttpException | HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        let errorContext: string;
        let errorMessage: string | string[];

        if (exception instanceof CustomHttpException) {
            errorContext = exception.context;
        } else {
            errorContext = HttpExceptionFilter.name;
        }

        if (status === HttpStatus.BAD_REQUEST) {
            errorMessage = exception.getResponse().toString() ?? BAD_REQUEST_EXCEPTION;
        } else if (status === HttpStatus.FORBIDDEN) {
            errorMessage = FORBIDDEN_EXCEPTION;
        } else {
            errorMessage = exception.message;
        }
        Logger.error(
            {
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: errorMessage,
                context: errorContext,
            },
            errorContext,
        );
        response.status(status).json({
            status: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: errorMessage,
            context: errorContext,
        });
    }
}
