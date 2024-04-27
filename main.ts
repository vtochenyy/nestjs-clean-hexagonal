import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/src/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    const port = process.env.SERVER_PORT || 9900;

    const config = new DocumentBuilder()
        .setTitle('Vitt Notificator API')
        .setDescription('API for BE vitt notificator')
        .setVersion('1.0')
        .addTag('dev')
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        deepScanRoutes: true,
        ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup('docs', app, document);

    await app.listen(port);
    Logger.log(`Application running at port: ${await app.getUrl()}`, 'bootstrap');
}

bootstrap().then(() => Logger.log('Application started!', 'bootstrap'));
