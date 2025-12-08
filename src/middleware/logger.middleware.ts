import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import { v4 as uuidV4 } from 'uuid';
import morgan from 'morgan';
import moment from 'moment';

// Extend the Request interface to include the 'id' property
declare module 'express' {
  interface Request {
    id?: string;
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private accessLogStream = fs.createWriteStream('./logs/access.log', {
    flags: 'a',
  });

  use(req: Request, res: Response, next: NextFunction) {
    req.id = uuidV4();

    morgan.token('req-body', (req: Request) => {
      return JSON.stringify(req.body);
    });

    morgan.token('date', (): string =>
      moment().format('YYYY-MM-DD HH:mm:ss:SSS Z'),
    );

    morgan.token('id', (req: Request) => req.id);

    morgan.format(
      'custom',
      ':date :method :url :status :res[content-length] - :response-time ms - ID: :id - Body: :req-body',
    );

    morgan('custom', { stream: this.accessLogStream })(req, res, next);
  }
}
