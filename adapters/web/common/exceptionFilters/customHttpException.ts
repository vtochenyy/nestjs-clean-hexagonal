import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export class CustomHttpException extends HttpException {
    public context: string;
    constructor(
        response: string | Record<string, any>,
        status: number,
        context: string,
        options?: HttpExceptionOptions,
    ) {
        super(response, status, options);
        this.context = context;
    }
}
