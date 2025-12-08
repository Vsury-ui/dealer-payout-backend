import { Module } from '@nestjs/common';
import { AwsSecretConfigService } from './aws-secret-config.service';

@Module({
  providers: [AwsSecretConfigService],
  exports: [AwsSecretConfigService]
})
export class AwsSecretConfigModule {}
