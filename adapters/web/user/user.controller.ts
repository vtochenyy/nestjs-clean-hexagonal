import { Controller, Inject, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/exceptionFilters/httpExceptionFilter';
import { BaseRequestInterceptor } from '../common/interceptors/baseRequestInterceptor';
import { UserUseCase } from '../../../core/src/application/ports/in/user/userUseCase';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(BaseRequestInterceptor)
@Controller('user')
export class UserController {
    constructor(@Inject(UserUseCase) private readonly userService: UserUseCase) {}
}
