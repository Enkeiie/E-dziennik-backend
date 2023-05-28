import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {nestCsrf, CsrfFilter} from 'ncsrf';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(nestCsrf());
   app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('Implementacja e-dziennika')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
