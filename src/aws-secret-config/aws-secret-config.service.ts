import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsSecretConfigService {
  private client: SecretsManagerClient;

  constructor(private configService: ConfigService) {
    this.client = new SecretsManagerClient({
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  async getSecretValue(secretName: string): Promise<Record<string, any>> {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await this.client.send(command);
    if (!response.SecretString) {
      throw new Error(`SecretString is undefined for secret: ${secretName}`);
    }
    return JSON.parse(response.SecretString) as Record<string, any>;
  }

  async upAwsSecretConfigService(): Promise<void> {
    const secrets: Record<string, string> = await this.getSecretValue(
      this.configService.get<string>('AWS_SECRET_NAME') ||
        (() => {
          throw new Error('AWS_SECRET_NAME is not defined');
        })(),
    );

    for (const key in secrets) {
      process.env[key] = secrets[key];
      this.configService.set(key, secrets[key]);
    }
  }
}
