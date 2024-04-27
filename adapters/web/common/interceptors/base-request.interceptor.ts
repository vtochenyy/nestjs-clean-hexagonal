import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseRequestInterceptor<T>
    implements NestInterceptor<T, { data: T; statusCode: number }>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<{ data: T; statusCode: number }> {
        return next.handle().pipe(
            map(data => {
                if (
                    context.switchToHttp().getRequest().url === '/api/user/login' ||
                    context.switchToHttp().getRequest().url === '/api/user/avatar'
                ) {
                    return data;
                } else {
                    return {
                        data: data,
                        status: context.switchToHttp().getResponse().statusCode,
                    };
                }
            }),
        );
    }
}
