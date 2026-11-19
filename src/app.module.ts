import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { FeedingModule } from './feeding/feeding.module';
import { HealthModule } from './health/health.module';
import { TrackingModule } from './tracking/tracking.module';
import { VaccinesModule } from './vaccines/vaccines.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Cada integrante puede usar sus propias credenciales con variables de entorno
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD ?? '1086223173',
      database: process.env.DB_NAME ?? 'siganado_db',
      autoLoadEntities: true, // Carga automáticamente las entidades que creemos
      synchronize: true, // Crea las tablas solas en la BD automáticamente
    }),
    AnimalsModule,
    FeedingModule,
    HealthModule,
    TrackingModule,
    VaccinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}