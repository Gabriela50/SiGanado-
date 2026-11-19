import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ForeignKeyFilter } from './common/filters/foreign-key.filter';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // AQUÍ ACTIVAS LAS VALIDACIONES GLOBALES:
  app.useGlobalPipes(new ValidationPipe());

  // Responde 400 cuando se envía un animalId que no existe en la tabla animals
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ForeignKeyFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();