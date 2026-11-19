import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedingEntity } from './entities/feeding.entity';
import { FeedingController } from './feeding.controller';
import { FeedingService } from './feeding.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedingEntity])],
  controllers: [FeedingController],
  providers: [FeedingService],
})
export class FeedingModule {}