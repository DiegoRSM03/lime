import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://*.vercel.app',
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Lime API')
    .setDescription(
      'The Lime API documentation - A modern REST API built with NestJS',
    )
    .setVersion('1.0')
    .addTag('app', 'Core application endpoints')
    .addServer('http://localhost:3000', 'Development server')
    .addServer(process.env.SWAGGER_PROD_API_URL, 'Production server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.API_PORT ?? 3000);
}

void bootstrap();
