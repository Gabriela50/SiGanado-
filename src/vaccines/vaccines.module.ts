import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineEntity } from './entities/vaccine.entity';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineEntity])],
  controllers: [VaccinesController],
  providers: [VaccinesService],
})
export class VaccinesModule {}