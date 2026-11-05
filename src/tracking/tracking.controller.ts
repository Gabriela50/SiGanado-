import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto, UpdateTrackingDto } from './tracking.dto';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get()
  findAll() {
    return this.trackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateTrackingDto) {
    return this.trackingService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateTrackingDto) {
    return this.trackingService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingService.remove(id);
  }
}