import { Injectable, NotFoundException } from '@nestjs/common';
import { Animal } from './animal.model';
import { CreateAnimalDto, UpdateAnimalDto } from './animal.dto';

@Injectable()
export class AnimalsService {
  private animals: Animal[] = [];

  findAll() {
    return this.animals;
  }

  findById(id: string) {
    const animal = this.animals.find((a) => a.id === id);
    if (!animal) {
      throw new NotFoundException(`Animal con ID ${id} no encontrado`);
    }
    return {
      message: 'Animal encontrado',
      data: animal,
    };
  }

  create(animalPayload: CreateAnimalDto) {
    const newAnimal: Animal = {
      ...animalPayload,
      id: `${new Date().getTime()}`,
    };
    this.animals.push(newAnimal);
    return {
      message: 'Animal registrado con éxito',
      data: newAnimal,
    };
  }

  update(id: string, animalChanges: UpdateAnimalDto) {
    const index = this.animals.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Animal con ID ${id} no encontrado`);
    }
    const updatedAnimal = { ...this.animals[index], ...animalChanges };
    this.animals[index] = updatedAnimal;
    return {
      message: 'Animal actualizado con éxito',
      data: updatedAnimal,
    };
  }

  delete(id: string) {
    const index = this.animals.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Animal con ID ${id} no encontrado`);
    }
    this.animals.splice(index, 1);
    return {
      message: 'Animal eliminado con éxito',
    };
  }
}