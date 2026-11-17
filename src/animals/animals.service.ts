import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalEntity } from './entities/animal.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
  ) {}

  async create(createAnimalDto: any): Promise<AnimalEntity> {
    return this.animalRepository.save(createAnimalDto);
  }

  async findAll(): Promise<AnimalEntity[]>{
    return this.animalRepository.find();
  }

  async findOne(id: string): Promise<AnimalEntity> {
    const animal = await this.animalRepository.findOne({ where: { id } });
    if (!animal) {
      throw new NotFoundException(`Animal con ID ${id} no encontrado`);
    }
    return animal;
  }

  // Alias para que coincida con el controlador si usa findById
  async findById(id: string): Promise<AnimalEntity> {
    return this.findOne(id);
  }

  // Método para buscar por raza que exige tu controlador
  async findByRaza(raza: string): Promise<AnimalEntity[]> {
    return this.animalRepository.find({ where: { raza } });
  }

  async update(id: string, updateAnimalDto: any): Promise<AnimalEntity> {
    const animal = await this.findOne(id);
    this.animalRepository.merge(animal, updateAnimalDto);
    return this.animalRepository.save(animal);
  }

  async remove(id: string): Promise<void> {
    const animal = await this.findOne(id);
    await this.animalRepository.remove(animal);
  }

  // Alias para que coincida con el controlador si usa delete
  async delete(id: string): Promise<void> {
    return this.remove(id);
  }
}