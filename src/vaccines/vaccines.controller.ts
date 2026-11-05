import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { VaccinesService } from './vaccines.service';
import { CreateVaccineDto, UpdateVaccineDto } from './vaccine.dto';

@Controller('vaccines')
export class VaccinesController {
  constructor(private readonly vaccinesService: VaccinesService) {}

  @Get()
  getAllVaccines(@Query('animalId') animalId?: string) {
    return this.vaccinesService.findAll(animalId);
  }

  // Va antes de ':id' para que "pendientes" no se tome como un ID.
  @Get('pendientes')
  getPendientes(
    @Query('dias', new DefaultValuePipe(30), ParseIntPipe) dias: number,
  ) {
    return this.vaccinesService.findPendientes(dias);
  }

  @Get(':id')
  getVaccineById(@Param('id') id: string) {
    return this.vaccinesService.findById(id);
  }

  @Post()
  createVaccine(@Body() vaccinePayload: CreateVaccineDto) {
    return this.vaccinesService.create(vaccinePayload);
  }

  @Put(':id')
  updateVaccine(
    @Param('id') id: string,
    @Body() vaccineChanges: UpdateVaccineDto,
  ) {
    return this.vaccinesService.update(id, vaccineChanges);
  }

  @Delete(':id')
  deleteVaccine(@Param('id') id: string) {
    return this.vaccinesService.delete(id);
  }
}
