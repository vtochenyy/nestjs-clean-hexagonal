import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../../adapters/web/common/interceptors/logInterceptor';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ServeStaticModule.forRoot(
            {
                rootPath: `${path}/ui/public/`,
                serveRoot: '/ui',
            },
            {
                rootPath: `${path}/upl/avatars`,
                serveRoot: '/avatar',
            },
        ),
        DatabaseModule,
    ],
    providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {}
