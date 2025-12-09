import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureAdStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
  constructor(private configService: ConfigService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${configService.get('AZURE_AD_TENANT_ID')}/v2.0/.well-known/openid-configuration`,
      clientID: configService.get('AZURE_AD_CLIENT_ID'),
      audience: configService.get('AZURE_AD_CLIENT_ID'),
      validateIssuer: true,
      issuer: `https://login.microsoftonline.com/${configService.get('AZURE_AD_TENANT_ID')}/v2.0`,
      loggingLevel: 'info',
      passReqToCallback: false,
    });
  }

  async validate(payload: any): Promise<any> {
    if (!payload || !payload.oid) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      userId: payload.oid,
      email: payload.email || payload.preferred_username,
      name: payload.name,
      roles: payload.roles || [],
    };
  }
}
