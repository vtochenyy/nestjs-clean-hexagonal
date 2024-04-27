import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DatabasePort } from '../../../../core/src/application/ports/out/database/database.port';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(@Inject(DatabasePort) private readonly databaseService: DatabasePort) {}
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        Logger.verbose(
            `Incoming query handled:\nRoot: ${
                context.switchToHttp().getRequest().url
            }\nHeaders: ${JSON.stringify(
                context.switchToHttp().getRequest().headers,
            )}\nBody: ${JSON.stringify(context.switchToHttp().getRequest().body)}`,
            context.getClass().name,
        );
        return next.handle().pipe();
    }
}
