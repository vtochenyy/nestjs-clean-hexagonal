import { Global, Module } from '@nestjs/common';
import { DatabasePort } from '../../../core/src/application/ports/out/database/database.port';
import { PrismaClientManager } from '../../../adapters/persistence/prisma.client';

@Global()
@Module({
    providers: [{ provide: DatabasePort, useClass: PrismaClientManager }],
    exports: [{ provide: DatabasePort, useClass: PrismaClientManager }],
})
export class DatabaseModule {}
