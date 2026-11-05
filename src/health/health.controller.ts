import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateHealthDto, UpdateHealthDto } from './health.dto';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  findAll() {
    return this.healthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateHealthDto) {
    return this.healthService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateHealthDto) {
    return this.healthService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthService.remove(id);
  }
}