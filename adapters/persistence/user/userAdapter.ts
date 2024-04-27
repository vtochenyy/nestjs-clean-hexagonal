import { Inject, Injectable } from '@nestjs/common';
import { UserPort } from '../../../core/src/application/ports/out/user/user.port';
import { DatabasePort } from '../../../core/src/application/ports/out/database/database.port';

@Injectable()
export class UserAdapter implements UserPort {
    constructor(@Inject(DatabasePort) private readonly databaseService: DatabasePort) {}
}
