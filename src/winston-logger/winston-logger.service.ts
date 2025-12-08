import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import { format } from 'date-fns';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const nodeEnv = process.env.NODE_ENV || 'UAT';
    const winstonFormat =
      nodeEnv === 'PROD' || nodeEnv === 'UAT'
        ? winston.format.combine(winston.format.simple())
        : winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          );

    const combinedLog = path.join(__dirname, '../../logs/info.log');
    const errorLog = path.join(__dirname, '../../logs/error.log');

    this.logger = winston.createLogger({
      level: 'info',
      format: winstonFormat,
      transports: [
        new winston.transports.File({ filename: combinedLog }),
        new winston.transports.File({ filename: errorLog, level: 'error' }),
        new winston.transports.Console({ level: 'info' }),
      ],
    });
  }

  private currentDateTime(): string {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss:SSS z');
  }

  log(requestId: string, filename: string, functionName: string, data: any) {
    this.logger.info(
      `${this.currentDateTime()} | ${requestId} | ${filename} | ${functionName} | ${JSON.stringify(data)}`,
    );
  }

  error(
    requestId: string,
    filename: string,
    functionName: string,
    data: string,
  ) {
    this.logger.error(
      `${this.currentDateTime()} | ${requestId} | ${filename} | ${functionName} | ${JSON.stringify(data)}`,
    );
  }

  warn(message: string, context?: string) {
    this.logger.warn(`${this.currentDateTime()} | ${context} | ${message}`);
  }
}
