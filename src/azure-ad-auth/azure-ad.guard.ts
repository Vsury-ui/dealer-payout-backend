import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AzureAdGuard extends AuthGuard('azure-ad') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
