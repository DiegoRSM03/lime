import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'lime-api',
    };
  }
}
