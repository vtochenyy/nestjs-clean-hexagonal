import { Injectable } from '@nestjs/common';
import { UserUseCase } from '../../ports/in/user/userUseCase';

@Injectable()
export class UserService implements UserUseCase {}
