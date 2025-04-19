import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RoleAndPermissionSeed } from './roles/roles.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.enableCors({
    origin: 'http://localhost:4200', // 👈 Allow Angular frontend
    credentials: true, // 👈 If you're using cookies or auth headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
