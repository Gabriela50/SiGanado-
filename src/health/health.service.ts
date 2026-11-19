import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthEntity } from './entities/health.entity';
import { CreateHealthDto, UpdateHealthDto } from './health.dto';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(HealthEntity)
    private readonly healthRepository: Repository<HealthEntity>,
  ) {}

  async findAll() {
    // Obtiene todos los registros médicos desde PostgreSQL
    return this.healthRepository.find();
  }

  async findOne(id: string) {
    const record = await this.healthRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(
        `Registro médico con ID ${id} no encontrado`,
      );
    }
    return record;
  }

  async create(payload: CreateHealthDto) {
    const newRecord = this.healthRepository.create(payload);
    return this.healthRepository.save(newRecord);
  }

  async update(id: string, payload: UpdateHealthDto) {
    const existingRecord = await this.findOne(id);
    const mergedRecord = this.healthRepository.merge(
      existingRecord,
      payload,
    );
    return this.healthRepository.save(mergedRecord);
  }

  async remove(id: string) {
    const existingRecord = await this.findOne(id);
    await this.healthRepository.remove(existingRecord);
    return { message: `Registro médico con ID ${id} eliminado exitosamente` };
  }
}