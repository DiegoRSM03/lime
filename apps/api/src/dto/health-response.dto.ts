import { ApiProperty } from '@nestjs/swagger';
import type { HealthResponseDto as IHealthResponseDto } from '@repo/api';

export class HealthResponseDto implements IHealthResponseDto {
  @ApiProperty({
    description: 'Health status of the service',
    example: 'healthy',
    enum: ['healthy', 'unhealthy'],
  })
  status: 'healthy' | 'unhealthy';

  @ApiProperty({
    description: 'ISO 8601 timestamp of the health check',
    example: '2024-01-01T00:00:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Name of the service',
    example: 'lime-api',
  })
  service: string;
}
