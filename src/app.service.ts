import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  healthCheck() {
    return {
      message: 'server is up',
      version: this.configService.get<string>('VERSION'),
    };
  }
}
