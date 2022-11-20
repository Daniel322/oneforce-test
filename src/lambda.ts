import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';

import { Express } from 'express';
import { Server } from 'http';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';

import * as express from 'express';
import * as dynamoose from 'dynamoose';

import { AppModule } from './modules/app.module';

let cachedServer: Server;

async function createExpressApp(
  expressApp: Express,
): Promise<INestApplication> {
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });

  dynamoose.aws.ddb.set(ddb);

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  return app;
}

async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const app = await createExpressApp(expressApp);
  await app.init();
  return createServer(expressApp);
}

export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
