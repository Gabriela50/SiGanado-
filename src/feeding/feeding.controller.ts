import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FeedingService } from './feeding.service';
import { CreateFeedingDto, UpdateFeedingDto } from './feeding.dto';

@Controller('feeding')
export class FeedingController {
  constructor(private readonly feedingService: FeedingService) {}

  @Get()
  findAll() {
    return this.feedingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedingService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateFeedingDto) {
    return this.feedingService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateFeedingDto) {
    return this.feedingService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedingService.remove(id);
  }
}