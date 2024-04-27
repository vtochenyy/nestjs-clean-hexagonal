import { Injectable } from '@nestjs/common';
import { UserUseCase } from '../../ports/in/user/user.usecase';

@Injectable()
export class UserService implements UserUseCase {}
