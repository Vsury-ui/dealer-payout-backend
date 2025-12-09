import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonLoggerModule } from './winston-logger/winston-logger.module';
import { AwsSecretConfigModule } from './aws-secret-config/aws-secret-config.module';
import { DatabaseModule } from './database/database.module';
import { AzureAdAuthModule } from './azure-ad-auth/azure-ad-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonLoggerModule,
    AwsSecretConfigModule,
    DatabaseModule,
    AzureAdAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
