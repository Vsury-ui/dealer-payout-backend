import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AzureAdGuard } from './azure-ad.guard';

@Controller('auth')
export class AzureAdAuthController {
  @Get('login')
  login() {
    return {
      message: 'To login, obtain an access token from Azure AD and send it in the Authorization header',
      authUrl: `https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/authorize?client_id={client-id}&response_type=token&redirect_uri={redirect-uri}&scope=openid%20profile%20email`,
    };
  }

  @Get('profile')
  @UseGuards(AzureAdGuard)
  getProfile(@Request() req) {
    return {
      message: 'Successfully authenticated with Azure AD',
      user: req.user,
    };
  }
}
