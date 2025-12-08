import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './middleware/http-exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
  
  const loggerMiddleware = new LoggerMiddleware();
  app.use((req: Request, res: Response, next: NextFunction) => loggerMiddleware.use(req, res, next));
  
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  
  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
