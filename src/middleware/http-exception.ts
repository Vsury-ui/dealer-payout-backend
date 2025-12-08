import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CommonResponse } from 'src/utils/constants/common-response.dto';

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as {
      message: string | string[];
    };
    const req = ctx.getRequest<Request>();
    const reqId = req.id;

    const res: CommonResponse<{ reqId: string } | null> = {
      status: false,
      code: 'BAD_REQUEST',
      message: Array.isArray(errorResponse.message)
        ? errorResponse.message.join(', ')
        : errorResponse.message,
      data: reqId ? { reqId } : null,
    };
    response.status(status).json(res);
  }
}
