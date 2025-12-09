import { Module } from '@nestjs/common';
import { AwsSecretConfigService } from 'src/aws-secret-config/aws-secret-config.service';
import { NewDataSource } from './database.provider';

@Module({
  providers: [
    AwsSecretConfigService,
    {
      provide: 'NEW_DATA_SOURCE',
      useFactory: async (awsSecretConfigService: AwsSecretConfigService) => {
        await awsSecretConfigService.upAwsSecretConfigService();

        const dbPort = process.env.DB_PORT
          ? parseInt(process.env.DB_PORT, 10)
          : undefined;

        const dataSource = NewDataSource({
          host: process.env.DB_HOST || '',
          db_user: process.env.DB_USER || '',
          db_password: process.env.DB_PASSWORD || '',
          db_name: process.env.DB_NAME || '',
          db_port: dbPort || 3306,
        });

        return await dataSource.initialize();
      },
      inject: [AwsSecretConfigService],
    },
  ],
})
export class DatabaseModule {}
