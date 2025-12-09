import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AzureAdStrategy } from './azure-ad.strategy';
import { AzureAdAuthController } from './azure-ad-auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'azure-ad' }),
    ConfigModule,
  ],
  controllers: [AzureAdAuthController],
  providers: [AzureAdStrategy],
  exports: [AzureAdStrategy],
})
export class AzureAdAuthModule {}
