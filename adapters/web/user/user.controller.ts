import { Controller, Inject, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/exceptionFilters/http-exception.filter';
import { BaseRequestInterceptor } from '../common/interceptors/base-request.interceptor';
import { UserUseCase } from '../../../core/src/application/ports/in/user/user.usecase';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(BaseRequestInterceptor)
@Controller('user')
export class UserController {
    constructor(@Inject(UserUseCase) private readonly userService: UserUseCase) {}
}
