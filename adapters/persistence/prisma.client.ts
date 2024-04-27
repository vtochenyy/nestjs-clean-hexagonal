import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabasePort } from '../../core/src/application/ports/out/database/database.port';

@Injectable()
export class PrismaClientManager extends PrismaClient implements DatabasePort {
    public async onModuleInit() {
        await this.$connect();
    }
}
