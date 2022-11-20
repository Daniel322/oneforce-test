import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import * as dynamoose from 'dynamoose';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const globalPrefix = 'api';

  const port = process.env.PORT || 3000;

  dynamoose.aws.ddb.local();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  app.enableCors();
  app.setGlobalPrefix(globalPrefix);

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Users API')
      .setDescription('')
      .setVersion('1.0')
      .addTag('users')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(port, '0.0.0.0', () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}
bootstrap();
