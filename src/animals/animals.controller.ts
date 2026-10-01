import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto, UpdateAnimalDto } from './animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  getAllAnimals() {
    return this.animalsService.findAll();
  }

  @Get(':id')
  getAnimalById(@Param('id') id: string) {
    return this.animalsService.findById(id);
  }

  @Post()
  createAnimal(@Body() animalPayload: CreateAnimalDto) { // <-- Aquí usa el DTO de creación
    return this.animalsService.create(animalPayload);
  }

  @Put(':id')
  updateAnimal(@Param('id') id: string, @Body() animalChanges: UpdateAnimalDto) { // <-- Aquí usa el DTO de actualización
    return this.animalsService.update(id, animalChanges);
  }

  @Delete(':id')
  deleteAnimal(@Param('id') id: string) {
    return this.animalsService.delete(id);
  }
}